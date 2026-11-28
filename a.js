class test26 {
  getInfo() {
    return {
      id: 'jsonhack26',
      name: 'jsonハックブロックv26',
      color1: '#07c9c6', // ブロック本体の色
      color2: '#08e3df', // 入力欄やドロップダウンの背景色
      color3: '#058381', // 枠線やメニューなどのアクセントカラー
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
        },
        {
          opcode:'setvar',
          blockType:Scratch.BlockType.REPORTER,
          text:'variables [json] の [name] を [new] に置き換える',
          arguments:{
            json:{
              type:Scratch.ArgumentType.STRING
            },
            name:{
              type:Scratch.ArgumentType.STRING
            },
            new:{
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
  setvar(args){
    const iti = Object.keys(JSON.parse(args.json))[(((Object.values(JSON.parse(args.json))).flat(Infinity)).filter((_, index) => index % 2 === 0)).indexOf(args.name)];//位置を検索
    return JSON.stringify({
      ...JSON.parse(args.json),
      [iti]:JSON.parse(args.json)[iti].with(0,args.new)
    });
  };
};

Scratch.extensions.register(new test26());