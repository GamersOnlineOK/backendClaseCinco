// ===================================IMPORTANTES=====================================
// en el archivo nodemon.json => agregamor el ignore:productos.json para prevenir un Loop


// // ACA TRAIGO EL ARCHIVO Y LO EDITO AGREGANDO UNA PROPIEDAD TEST
// const json = require("./package.json");
// json.test="soy muy lento";
// console.log(json);


const fs = require("fs");

// fs.promises.readFile('./package.json').then(data=>{
//     const json = JSON.parse(data.toString('utf-8'));
//     json.test="Se puso mas rapido";
//     console.log(json);

// })
class Archivo {
    constructor(file) {
        this.file = file;

    }
    // GUARDAR ARCHIVOS CON ASYNC AWAIT
    async guardarAsync(producto) {
        console.log(this.file);
        try {
            const objson = await fs.promises.readFile(this.file);

            const obj = JSON.parse(objson.toString('utf-8'));
            obj.push({ ...producto, id: obj.length });
            console.log("push");
            try {
                console.log(obj);
                await fs.promises.writeFile(this.file, JSON.stringify(obj, null, "\t"));

            } catch (error) {
                throw Error(error)
            }
        } catch (error) {
            console.log(error);
            try {
                
                await fs.promises.writeFile('productos.json', JSON.stringify([{ ...producto, id: 0 }]))
            } catch (error) {
                throw new Error(error);
            }
        }

    }
    // METODO PARA GUARDAR ARCHIVOS CON PROMESAS
    guardar(producto) {
        if (this.exist()) {

            fs.promises.readFile(this.file).then(data => {

                const json = JSON.parse(data.toString('utf-8'));
                json.push({ ...producto, id: json.length });
                fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t")).then(() => {
                    console.log("Agregado");
                })
            });
        } else {

            fs.promises.writeFile('productos.json', JSON.stringify([{ ...producto, id: 0 }])).then(data => {
                console.log("Escritura Correcta!");
            })
        }
    }
    // COMPRUEBA SI EL ARCHIVO QUE EXISTE
    exist() {
        return fs.existsSync(this.file);
    }

}
let myFile = new Archivo('./productos.json');



myFile.guardarAsync({
    title: "Short",
    price: 350,
    thumbnail: "url:1"
}
);
setTimeout(()=>{
    myFile.guardarAsync({
    title: "Remera",
    price: 270,
    thumbnail: "url:2"
    }
);
},3000)
