const Shopping = require('./../models/shopping.model');
const Fs = require('fs');
const Utils = require('util');
const reader = Utils.promisify(Fs.readFile);

exports.index = async (req, res)=>{
    console.log(req.method);
    let products = await Shopping.find();
    let list = '';
    products.forEach((product)=>{
        list += `
            <li>${product.product} - ${product.numberOf} 
            <form method="POST" style="display:inline-block;">
                <input hidden name="${product._id}">
                <button>X</button> 
            </form>
            </li>
        `;
    });
    let template = await reader(`${process.cwd()}/views/shopping/index.html`, 'UTF-8');
    let output = template.replace(/{{PRODUCT_LIST}}/g, list);
    res.end(output);
    if(req.method === 'POST'){
        let data=[];
        req.on('data', (chunk)=>{
            data.push(chunk);
            if(data.toString().indexOf('product') === 0){
                _addInDB(data);
                console.log(data.toString())
            }else{
                _deleteProduct(data);
            }
        });
    }
};

const _addInDB = (data)=>{
    let formValue = data.toString().split('&');
    console.log(formValue);
    let product = formValue[0].split('=')[1];
    let numberOf = formValue[1].split('=')[1];
    let newProduct = {
        product : product,
        numberOf : numberOf
    }
    // formValue = '';
    let newS = new Shopping(newProduct);
    newS.save();
};

const _deleteProduct =async (data) =>{
    let formValue = data.toString().split('=');
    let id = formValue[0];
    await Shopping.findByIdAndDelete(id);
}