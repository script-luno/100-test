class test5 {
  getInfo() {
    return {
      id: '5',
      name: 'jsonハックブロックver5',
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
              type:Scratch.ArgumentType.STRING
            },
            key:{
              type:Scratch.ArgumentType.STRING
            }
          }
        },
        {
          opcode:'newjson',
          blockType: Scratch.BlockType.REPORTER,
          text:'key [key] 要素 [youso] でjson生成',
          arguments:{
            key:{
              type:Scratch.ArgumentType.STRING
            },
            youso:{
              type:Scratch.ArgumentType.STRING
            }
          }
        },
        {
          opcode:'allvar',
          blockType: Scratch.BlockType.REPORTER,
          text:'json [json] の全ての変数名',
          arguments:{
            json:{
              type:Scratch.ArgumentType.STRING
            }
          }
        },
        {
          opcode:'alllist',
          blockType:Scratch.BlockType.REPORTER,
          text:'json [json] の全てのリスト名',
          arguments:{
            json:{
              type:Scratch.ArgumentType.STRING
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
  newjson(args){
    return JSON.stringify({ [args.key]: args.youso });
  };
  allvar(args){
    return ((Object.values(JSON.parse(args.json)["variables"])).flat(Infinity)).filter((_, index) => index % 2 === 0);
  };
  alllist(args){
    const list = JSON.parse(args.json)["lists"];
    const key = Object.keys(list);
    let ret = [];
    for(let i=0;i<key.length;i++){
      ret.push(list[key[i]][0]);
    };
    return ret;
  };
};

Scratch.extensions.register(new test5());