import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import hashstore from './hashstore';

class App extends Component {
 
    state = {
      hash:null,
      path:'',
      fileName:'',
      title:'',
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: ''   
    };
   
    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    handleValueOnChange = (e) => {
          const s = this.state
          switch (e.target.id) {
            case "t":
              s.title = e.target.value;
              break;

            case "f":
              s.fileName = e.target.value;
              break;
            default:
          }
          this.forceUpdate();
      };



    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    onClick = async () => {

    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        // get Transaction Receipt in console on click
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick

    onSubmit = async (event) => {
      event.preventDefault();

      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();
     
      console.log('Sending from Metamask account: ' + accounts[0]);

      //obtain contract address from hashstore.js
      const ethAddress= await hashstore.options.address;
      this.setState({ethAddress});

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
      await ipfs.add(this.state.buffer, (err, hash) => {
        console.log(err,hash);
        //setState by setting hash to hash[0].hash 
        this.setState({ hash:hash[0].hash });
        this.setState({ path: 'https://ipfs.io/ipfs/' + this.state.hash})
        window.open('https://ipfs.io/ipfs/' + this.state.hash, '_blank');
        
        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
        //return the transaction hash from the ethereum contract
        hashstore.methods.addItem(this.state.path, this.state.fileName, this.state.title, this.state.hash).send({
          from: accounts[0] 
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); //hashstore 
      }) //await ipfs.add 
    }; //onSubmit 
    
  
    render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <h1>&#9654; BlockTube</h1>
          </header>
          
          <hr />

        <Grid>
          <h3> Choose a video to upload:</h3>
          <Form onSubmit={this.onSubmit}>
          
            <input 
              type = "file"
              onChange = {this.captureFile}
            />

             &nbsp;&nbsp;Add video title:&nbsp; 

             <input 
              type="text"
              id= "t"
              name="title"
              placeholder="Title.."
              value = {this.state.title}
              onChange={this.handleValueOnChange} 
              />

              &nbsp;&nbsp;Add video name:&nbsp;

           <input 
              type="text"
              id= "f"
              name="fileName"
              placeholder="Name.."
              value = {this.state.fileName}
              onChange={ (e) => this.handleValueOnChange(e) }
              />

              &nbsp;&nbsp;

           <Button 
             bsStyle="danger" 
             type="submit"> 
             Send it 
             </Button>

          </Form>

          <hr/>

              <Table bordered responsive>
                <thead>
                  <tr>
                    <th bgcolor= "#f1f1f1">Category</th>
                    <th bgcolor= "#f1f1f1">Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr>
                    <td>IPFS Hash stored on Eth Contract</td>
                    <td>{this.state.hash}</td>
                  </tr>

                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>

                  <tr>
                    <td>Transaction Hash</td>
                    <td>{this.state.transactionHash}</td>
                  </tr>

                  <tr>
                    <td>Block Number</td>
                    <td>{this.state.blockNumber}</td>
                  </tr>

                  <tr>
                    <td>Gas used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>

                  <tr>
                    <td>Path</td>
                    <td>{this.state.path}</td>
                  </tr>                 
                </tbody>
            </Table>

            <Button bsStyle="danger" onClick = {this.onClick}> Show Block Number & Gas used </Button>

        </Grid>
     </div>
      );
    } //render
}

export default App;
