export const ERC721_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', type: 'address' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_approved', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
    ],
    name: 'approve',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    type: 'function',
  },
  // Added Mint Function To ABI
  {
    constant: true,
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'tokenURI', type: 'string' },
    ],
    name: 'mint',
    type: 'function',
  },
];

export default ERC721_ABI;
