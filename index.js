const SHA256 = require('crypto-js/sha256');
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash +this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock (){
    return new Block(0, '13/09/2018', 'This is the genesis block', "0");
  }

  getLastestBlock(){
    return this.chain[this.chain.length -1 ];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLastestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(){
    for(let i=1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];
      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }

    return 'Obviously';
  }
}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1, '14/09/2018', {amount: 4}));
myCoin.addBlock(new Block(2, '15/09/2018', { amount: 20 }));
myCoin.addBlock(new Block(3, '16/09/2018', { amount: 34 }));

//myCoin.chain[1].data = {amount: 32}
console.log('Is my blockchain Valid? ' + myCoin.isChainValid());
console.log(JSON.stringify(myCoin, null, 4));
