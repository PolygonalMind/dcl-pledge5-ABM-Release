// Warning this is actually a modified ERC721 abi
// Its not a complete erc1155 abi!!
export const ERC1155_ABI = [
   {
     constant: true,
     inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
     name: 'supportsInterface',
     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: '_from', type: 'address' },
       { internalType: 'address', name: '_to', type: 'address' },
       { internalType: 'uint256[]', name: '_tokenIds', type: 'uint256[]' }
     ],
     name: 'safeBatchTransferFrom',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: true,
     inputs: [],
     name: 'name',
     outputs: [{ internalType: 'string', name: '', type: 'string' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
     name: 'getApproved',
     outputs: [{ internalType: 'address', name: '', type: 'address' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: 'to', type: 'address' },
       { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
     ],
     name: 'approve',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address[]', name: '_beneficiaries', type: 'address[]' },
       { internalType: 'bytes32[]', name: '_wearableIds', type: 'bytes32[]' }
     ],
     name: 'issueTokens',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: true,
     inputs: [],
     name: 'totalSupply',
     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: 'from', type: 'address' },
       { internalType: 'address', name: 'to', type: 'address' },
       { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
     ],
     name: 'transferFrom',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: '_from', type: 'address' },
       { internalType: 'address', name: '_to', type: 'address' },
       { internalType: 'uint256[]', name: '_tokenIds', type: 'uint256[]' },
       { internalType: 'bytes', name: '_data', type: 'bytes' }
     ],
     name: 'safeBatchTransferFrom',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: true,
     inputs: [
       { internalType: 'address', name: 'owner', type: 'address' },
       { internalType: 'uint256', name: 'index', type: 'uint256' }
     ],
     name: 'tokenOfOwnerByIndex',
     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'string', name: '_wearableId', type: 'string' },
       { internalType: 'uint256', name: '_maxIssuance', type: 'uint256' }
     ],
     name: 'addWearable',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'bytes32[]', name: '_wearableIds', type: 'bytes32[]' },
       { internalType: 'uint256[]', name: '_maxIssuances', type: 'uint256[]' }
     ],
     name: 'addWearables',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: 'from', type: 'address' },
       { internalType: 'address', name: 'to', type: 'address' },
       { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
     ],
     name: 'safeTransferFrom',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: '_operator', type: 'address' },
       { internalType: 'bool', name: '_allowed', type: 'bool' }
     ],
     name: 'setAllowed',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
     name: 'tokenByIndex',
     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: false,
     inputs: [{ internalType: 'string', name: '_baseURI', type: 'string' }],
     name: 'setBaseURI',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: '_beneficiary', type: 'address' },
       { internalType: 'string', name: '_wearableId', type: 'string' }
     ],
     name: 'issueToken',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
     name: 'ownerOf',
     outputs: [{ internalType: 'address', name: '', type: 'address' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [],
     name: 'baseURI',
     outputs: [{ internalType: 'string', name: '', type: 'string' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   /*{
     constant: true,
     inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
     name: 'balanceOf',
     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
 },*/
 // Hack for ERC1155
 {
   "inputs": [
     {
       internalType: "address",
       name: "account",
       type: "address"
     },
     {
       internalType: "uint256",
       name: "id",
       type: "uint256"
     }
   ],
   name: "balanceOf",
   outputs: [
     {
       internalType: "uint256",
       name: "",
       type: "uint256"
     }
   ],
   stateMutability: "view",
   type: "function"
 },
 // End hack
   {
     constant: false,
     inputs: [],
     name: 'renounceOwnership',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'string', name: '_wearableId', type: 'string' }],
     name: 'getWearableKey',
     outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
     payable: false,
     stateMutability: 'pure',
     type: 'function'
   },
   {
     constant: true,
     inputs: [],
     name: 'owner',
     outputs: [{ internalType: 'address', name: '', type: 'address' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [],
     name: 'isOwner',
     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [],
     name: 'symbol',
     outputs: [{ internalType: 'string', name: '', type: 'string' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: 'to', type: 'address' },
       { internalType: 'bool', name: 'approved', type: 'bool' }
     ],
     name: 'setApprovalForAll',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: true,
     inputs: [],
     name: 'isComplete',
     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
     name: 'wearables',
     outputs: [{ internalType: 'string', name: '', type: 'string' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: 'from', type: 'address' },
       { internalType: 'address', name: 'to', type: 'address' },
       { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
       { internalType: 'bytes', name: '_data', type: 'bytes' }
     ],
     name: 'safeTransferFrom',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
     name: 'issued',
     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
     name: 'tokenURI',
     outputs: [{ internalType: 'string', name: '', type: 'string' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'address', name: '', type: 'address' }],
     name: 'allowed',
     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [],
     name: 'wearablesCount',
     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
     name: 'maxIssuance',
     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: true,
     inputs: [
       { internalType: 'address', name: 'owner', type: 'address' },
       { internalType: 'address', name: 'operator', type: 'address' }
     ],
     name: 'isApprovedForAll',
     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
     payable: false,
     stateMutability: 'view',
     type: 'function'
   },
   {
     constant: false,
     inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
     name: 'transferOwnership',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: false,
     inputs: [
       { internalType: 'address', name: '_from', type: 'address' },
       { internalType: 'address', name: '_to', type: 'address' },
       { internalType: 'uint256[]', name: '_tokenIds', type: 'uint256[]' }
     ],
     name: 'batchTransferFrom',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     constant: false,
     inputs: [],
     name: 'completeCollection',
     outputs: [],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'function'
   },
   {
     inputs: [
       { internalType: 'string', name: '_name', type: 'string' },
       { internalType: 'string', name: '_symbol', type: 'string' },
       { internalType: 'address', name: '_operator', type: 'address' },
       { internalType: 'string', name: '_baseURI', type: 'string' }
     ],
     payable: false,
     stateMutability: 'nonpayable',
     type: 'constructor'
   },
   {
     anonymous: false,
     inputs: [
       {
         indexed: false,
         internalType: 'string',
         name: '_oldBaseURI',
         type: 'string'
       },
       {
         indexed: false,
         internalType: 'string',
         name: '_newBaseURI',
         type: 'string'
       }
     ],
     name: 'BaseURI',
     type: 'event'
   },
   {
     anonymous: false,
     inputs: [
       {
         indexed: true,
         internalType: 'address',
         name: '_operator',
         type: 'address'
       },
       { indexed: false, internalType: 'bool', name: '_allowed', type: 'bool' }
     ],
     name: 'Allowed',
     type: 'event'
   },
   {
     anonymous: false,
     inputs: [
       {
         indexed: true,
         internalType: 'bytes32',
         name: '_wearableIdKey',
         type: 'bytes32'
       },
       {
         indexed: false,
         internalType: 'string',
         name: '_wearableId',
         type: 'string'
       },
       {
         indexed: false,
         internalType: 'uint256',
         name: '_maxIssuance',
         type: 'uint256'
       }
     ],
     name: 'AddWearable',
     type: 'event'
   },
   {
     anonymous: false,
     inputs: [
       {
         indexed: true,
         internalType: 'address',
         name: '_beneficiary',
         type: 'address'
       },
       {
         indexed: true,
         internalType: 'uint256',
         name: '_tokenId',
         type: 'uint256'
       },
       {
         indexed: true,
         internalType: 'bytes32',
         name: '_wearableIdKey',
         type: 'bytes32'
       },
       {
         indexed: false,
         internalType: 'string',
         name: '_wearableId',
         type: 'string'
       },
       {
         indexed: false,
         internalType: 'uint256',
         name: '_issuedId',
         type: 'uint256'
       }
     ],
     name: 'Issue',
     type: 'event'
   },
   { anonymous: false, inputs: [], name: 'Complete', type: 'event' },
   {
     anonymous: false,
     inputs: [
       { indexed: true, internalType: 'address', name: 'from', type: 'address' },
       { indexed: true, internalType: 'address', name: 'to', type: 'address' },
       {
         indexed: true,
         internalType: 'uint256',
         name: 'tokenId',
         type: 'uint256'
       }
     ],
     name: 'Transfer',
     type: 'event'
   },
   {
     anonymous: false,
     inputs: [
       {
         indexed: true,
         internalType: 'address',
         name: 'owner',
         type: 'address'
       },
       {
         indexed: true,
         internalType: 'address',
         name: 'approved',
         type: 'address'
       },
       {
         indexed: true,
         internalType: 'uint256',
         name: 'tokenId',
         type: 'uint256'
       }
     ],
     name: 'Approval',
     type: 'event'
   },
   {
     anonymous: false,
     inputs: [
       {
         indexed: true,
         internalType: 'address',
         name: 'owner',
         type: 'address'
       },
       {
         indexed: true,
         internalType: 'address',
         name: 'operator',
         type: 'address'
       },
       { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' }
     ],
     name: 'ApprovalForAll',
     type: 'event'
   },
   {
     anonymous: false,
     inputs: [
       {
         indexed: true,
         internalType: 'address',
         name: 'previousOwner',
         type: 'address'
       },
       {
         indexed: true,
         internalType: 'address',
         name: 'newOwner',
         type: 'address'
       }
     ],
     name: 'OwnershipTransferred',
     type: 'event'
   },
   {
      constant: false,
      inputs: [
         {
            name: "account",
            type: "address"
         },
         {
            name: "tokenId",
            type: "uint256"
         },
         {
            name: "amount",
            type: "uint256"
         }
      ],
      name: "burn",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
   },
 ]