import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton,AppBar,Toolbar,Typography,Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {  InputAdornment,InputBase,TableContainer} from '@material-ui/core';
import { Feedback } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import ApiService from '../service/ApiService';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};




const mystyle = {
    fontFamily: "Arial",
    backgroundColor:"transparent",
    };
const style ={
    // display: 'flex',
    // justifyContent: 'center'
    table: {
          minWidth: 900,
        },
    grid: {
            margin: '35px 150px 20px 50px',
            padding: '10px 10px 10px 10px',
            backgroundColor: "black"
        },
    paper: {
          padding: '10px 10px 10px 10px', 
          margin: '10px 10px 10px 10px',
          position: 'inherit'
        },
    search: {
          position: 'relative',
          align:'left',
          },
}

class ViewFeedback extends Component {

    constructor(props) {
        super(props)
        this.state = {
          page:0,
          rowsPerPage:5,
          FeedbackArr: [],
          count:0,
          message: null
        }
        
    }

    componentDidMount(){
      this.reloadFeedbackList();
     
    }
    handleChangePage = (event, newPage) => {
      this.setState({
        page:newPage
      });
      ApiService.getAllFeedback(newPage,5)
      .then((Response) => {
        this.setState({
          FeedbackArr:Response.data.data,
          count:Response.data.TotalNoOfElements
         })
      })
    };

    handleChangeRowsPerPage = (event) => {
      //setRowsPerPage(parseInt(event.target.value, 10));
      this.setState ({
        page:0,
        rowsPerPage:event.target.value
      })
    };
    
    // componentDidMount(){
    //     this.reloadFeedbackList();
    //   }
    
      reloadFeedbackList = () => {
        ApiService.getAllFeedback(this.state.page,5)
           .then((Response) => {
               console.log(Response);
             this.setState({
                 FeedbackArr:Response.data.data,
                count:Response.data.TotalNoOfElements})
           })
      }


    deleteFeedbackByfeedbackId = (id) => {
       
        ApiService.deleteFeedbackByfeedbackId(id)
           .then(res => {
               this.setState({message : 'Feedback deleted successfully.'});
               this.setState({FeedbackArr: this.state.FeedbackArr.filter(FeedbackArr => FeedbackArr.id !== id)});
           })

    }

    render() {

        const {row} = this.state;

        return (
          <div className="feedbackSS">

<div>
                <AppBar position="static" style={mystyle}>
                    <Toolbar>
                    
                        
                        <Typography variant="h6" >
                            <img src="https://dynamic.brandcrowd.com/preview/logodraft/207be0dc-ebe7-4be0-9c20-327e88b66c5f/image/large.png" style={{width:"80px",height:"70px"}} ></img>
                        </Typography>
                        
                        <Grid item xs={9}>
                        <Button href="/Home"  variant="contained"  style={{backgroundColor:"black",color:"gold",marginLeft:10}}>HOME</Button>

                        </Grid>

                        <Grid item xs={2}>
                        <Button  variant="contained"  href="/feedbacks"  style={{backgroundColor:"black",color:"gold",marginLeft:10}}>Feedbacks</Button>
                        </Grid>


                        <Grid item xs={2}>
                        <Button  variant="contained"  href="/History"  style={{backgroundColor:"black",color:"gold",marginLeft:10}}>History</Button>
                        </Grid>

                        <Grid item xs={2}>
                        <Button  variant="contained"  href="/Profile"  style={{backgroundColor:"black",color:"gold",marginLeft:10}}>Profile</Button>
                        </Grid>
                        <Grid item xs={1} >
                        <Button  variant="contained"  style={{backgroundColor:"black",color:"gold",marginLeft:10}}>Logout</Button>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>

               <Grid style={style.grid}>
               <Paper style = {style.paper}>
                   <h1 style={{backgroundColor:"lightcyan"}}>View Feedback</h1>
                   <div style={style.search}>
                       <div style={style.searchIcon} style = {{float: 'right',marginBottom:"50px"}}>
                      
                      
                     <TextField
                 
                  id="input-with-icon-textfield"
                  label="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon/>
                      
                      </InputAdornment>
                    ),
                  }}
                />
                        
                      </div>
                  </div>
                  
                  <TableContainer>
                <Table style={style.table} size="small">
                  <TableHead>
                    <TableRow >
                    
                      <TableCell align="left"><b>Id</b></TableCell>
                      <TableCell align="left"><b>UserId</b></TableCell>
                      <TableCell align="left"><b>agentRating</b></TableCell>
                      <TableCell align="left"><b>appRating</b></TableCell>
                      <TableCell align="left"><b>comment</b></TableCell>
                      <TableCell align="left"><b>date</b></TableCell>
                      <TableCell align="left"><b>delete</b></TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.FeedbackArr.map((row) => (
                      <TableRow>
                        
                       
                       
                        <TableCell align="left">{row.Id}</TableCell>
                        <TableCell align="left">{row.UserId}</TableCell>
                        <TableCell align="left">{row.agentRating}</TableCell>
                        <TableCell align="left">{row.appRating}</TableCell>
                        
                        <TableCell align="left">{row.comment}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left" onClick= {()=>this.deleteFeedbackByfeedbackId(row.id)}><IconButton ><DeleteIcon color="error"  inputProps={{ 'aria-label': 'DeleteIcon with default color' }}/></IconButton>

                       <IconButton href="/Eaditproduct" ></IconButton > </TableCell>
                      
                      </TableRow>
                     ))} 
                    
                  </TableBody>
                  <TableFooter>
          <TableRow>
            <TablePagination
              // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              // colSpan={3}
              count={this.state.count}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
                </Table>
          
               
              </TableContainer>
          
              
              
                </Paper>
              </Grid>
              </div>
        );
    }

}

export default ViewFeedback;