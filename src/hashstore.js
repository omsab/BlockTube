import web3 from './web3';
const address = '0xe398a7b5467512ad958503b561eb88dce7bb7429';
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_path",
				"type": "string"
			},
			{
				"name": "_fileName",
				"type": "string"
			},
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "addItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getItem",
		"outputs": [
			{
				"name": "path",
				"type": "string"
			},
			{
				"name": "fileName",
				"type": "string"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getItemCount",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
export default new web3.eth.Contract(abi, address);