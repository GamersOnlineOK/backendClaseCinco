// ===================================IMPORTANTES=====================================
// en el archivo nodemon.json => agregamor el ignore:productos.json para prevenir un Loop


// // ACA TRAIGO EL ARCHIVO Y LO EDITO AGREGANDO UNA PROPIEDAD TEST
// const json = require("./package.json");
// json.test="Agrego info";
// console.log(json);


const fs = require("fs");

// fs.promises.readFile('./package.json').then(data=>{
//     const json = JSON.parse(data.toString('utf-8'));
//     json.test="Lectura de Info";
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
    async leer(){
        try {
            const objon= await fs.promises.readFile(this.file);
        const obj=JSON.parse(objon.toString('utf-8'));
        console.log(obj);
        } catch (error) {
            console.log(["array Vacio"]);
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
    console.log("===================AGREGA OTRO PRODUCTO==================");
    myFile.guardarAsync({
    title: "Remera",
    price: 270,
    thumbnail: "url:2"
    }
);
},3000)
myFile.leer();
setTimeout(()=>{
    console.log("===================LEE EL ARCHIVO==================");
    myFile.leer();
},5000)

