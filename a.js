class test {
  getInfo() {
    return {
      id: '123456789',
      name: 'jsonハックブロック',
      blocks: [
        {
          opcode: 'joinjson',
          blockType: Scratch.BlockType.REPORTER,
          text: 'json [jsonA] と [jsonB] を結合',
          arguments:{
            jsonA:{
                type:Scratch.ArgumentType.STRING
            },
            jsonB:{
                type:Scratch.ArgumentType.STRING
            }
          }
        },
        {
            opcode:'blockjson',
            blockType: Scratch.BlockType.REPORTER,
            text:'blocks [blocks] の [key] 番目のopcode',
            arguments:{
                blocks:{
                    type:Scratch.ArgumentType.STRING,
                },
                key:{
                    type:Scratch.ArgumentType.STRING,
                }
            }
        }
      ]
    };
  }

  joinjson(args) {
    return JSON.stringify({...JSON.parse(args.jsonA),...JSON.parse(args.jsonB)});
  };
  blockjson(args){
    return (JSON.parse(args.blocks)[args.key])["opcode"];
  };
};

Scratch.extensions.register(new test());