import web3 from './web3';

const address = '0xb84b12e953f5bcf01b05f926728e855f2d4a67a9';
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