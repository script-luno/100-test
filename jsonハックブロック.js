(function (Scratch) {
  "use strict";
  class test35 {
    getInfo() {
      return {
        id: "jsonhack35",
        name: "jsonハックブロックv35",
        color1: "#1183ca", // ブロック本体の色
        color2: "#08e3df", // 入力欄やドロップダウンの背景色
        color3: "#058381", // 枠線やメニューなどのアクセントカラー
        blocks: [
          {
            opcode: "joinjson",
            blockType: Scratch.BlockType.REPORTER,
            text: "json [jsonA] と [jsonB] を結合",
            arguments: {
              jsonA: {
                type: Scratch.ArgumentType.STRING,
              },
              jsonB: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "blockjson",
            blockType: Scratch.BlockType.REPORTER,
            text: "blocks [blocks] の [key] 番目のopcode",
            arguments: {
              blocks: {
                type: Scratch.ArgumentType.STRING,
              },
              key: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "newjson",
            blockType: Scratch.BlockType.REPORTER,
            text: "key [key] 要素 [youso] でjson生成",
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
              },
              youso: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "allvar",
            blockType: Scratch.BlockType.REPORTER,
            text: "json [json] の全ての変数名",
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "alllist",
            blockType: Scratch.BlockType.REPORTER,
            text: "json [json] の全てのリスト名",
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "setvar",
            blockType: Scratch.BlockType.REPORTER,
            text: "variables [json] の [name] を [new] に置き換える",
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
              },
              name: {
                type: Scratch.ArgumentType.STRING,
              },
              new: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "setblock",
            blockType: Scratch.BlockType.REPORTER,
            text: "blocks [blocks] 内のsensing_ofの変数名を変換表 [table] で変換する",
            arguments: {
              blocks: {
                type: Scratch.ArgumentType.STRING,
              },
              table: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
      };
    }
    joinjson(args) {
      return JSON.stringify({
        ...JSON.parse(args.jsonA),
        ...JSON.parse(args.jsonB),
      });
    }
    blockjson(args) {
      return JSON.parse(args.blocks)[args.key]["opcode"];
    }
    newjson(args) {
      return JSON.stringify({ [args.key]: args.youso });
    }
    allvar(args) {
      return JSON.stringify(
        Object.values(JSON.parse(args.json)["variables"])
          .flat(Infinity)
          .filter((_, index) => index % 2 === 0),
      );
    }
    alllist(args) {
      const list = JSON.parse(args.json)["lists"];
      const key = Object.keys(list);
      let ret = [];
      for (let i = 0; i < key.length; i++) {
        ret.push(list[key[i]][0]);
      }
      return JSON.stringify(ret);
    }
    setvar(args) {
      const iti = Object.keys(JSON.parse(args.json))[
        Object.values(JSON.parse(args.json))
          .flat(Infinity)
          .filter((_, index) => index % 2 === 0)
          .indexOf(args.name)
      ]; //位置を検索
      return JSON.stringify({
        ...JSON.parse(args.json),
        [iti]: JSON.parse(args.json)[iti].with(0, args.new),
      });
    }
    setblock(args) {
      /** 
      args.tableの書き方は、
      {"stage":[{"English":"英語"}],"スプライト1":[{"English":"英語"}]}
      のように書きます。
      */
      let blocks = JSON.parse(args.blocks);
      const key = Object.keys(blocks);
      let sensing_of = []; //sensing_ofの位置(key)
      let sensing_of_ob_menu = []; //sensing_of_ob_menuの位置(key)
      let sensing_of_ob_menu_parent = []; //sensing_of_ob_menuの対応ID
      let sensing_of_ob_menu_sprite = []; //対象スプライト
      const table = JSON.parse(args.table);//変換表をobject型にして使用可能に
      console.log("成功!!");
      for (let i = 0; i < key.length; i++) {
        if (blocks[key[i]]["opcode"] == "sensing_of") {
          if (
            [
              "x position",
              "y position",
              "direction",
              "costume #",
              "costume name",
              "size",
              "backdrop #",
              "backdrop name",
              "volume",
              "background #",
              "background name",
              "volume",
              "tempo",
            ].includes(blocks[key[i]]["fields"]["PROPERTY"][0])
          ) {
            sensing_of.push(key[i]);
          };
        } else if (blocks[key[i]]["opcode"] == "sensing_of_object_menu") {
          sensing_of_ob_menu.push(blocks[key[i]]["parent"]);
          sensing_of_ob_menu_sprite.push(blocks[key[i]]["fields"]["OBJECT"][0]);
          sensing_of_ob_menu_parent.push(blocks[key[i]]["parent"])
        };
      };
      console.log(`コード読み取り完了。${sensing_of.length}ブロックのsensing_ofを発見しました`);
      for(let i=0;i<sensing_of.length;i++){
        blocks[sensing_of[i]]["fields"]["PROPERTY"] = args.table[sensing_of_ob_menu_sprite[sensing_of_ob_menu_parent.indexOf(sensing_of[i])]][blocks[sensing_of[i]]["fields"]["PROPERTY"]];//変数名を翻訳済みの変数名に変更
      };
      return blocks;
    };
  };

  Scratch.extensions.register(new test35());
})(Scratch);
