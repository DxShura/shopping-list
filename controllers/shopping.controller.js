const Shopping = require('./../models/shopping.model');
const Fs = require('fs');
const Utils = require('util');
const reader = Utils.promisify(Fs.readFile);

exports.index = async (req, res)=>{
    let products = await Shopping.find();
    let list = '';
    products.forEach((product)=>{
        list += `
            <li>${product.product} - ${product.numberOf} - <button id="trigger-delete" data-id="${product._id}">Delete</button></li>
        `;
    });
    let template = await reader(`${process.cwd()}/views/shopping/index.html`, 'UTF-8');
    let output = template.replace(/{{PRODUCT_LIST}}/g, list);
    res.end(output);
};
exports.delete = async(req, res)=>{
    let response = {};
    let body = '';

    req.on('data', (data)=>{
        body += data;
    });

    req.on('end', async function(){
        let post = JSON.parse(body);
        let deleted = await Shopping.findByIdAndRemove(post.id);

        if(deleted._id){
            response.status = 200; 
            response.message = 'Object successfully deleted';
        }else {
            response.status = 500; 
            response.message = 'Error while deleting';
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

exports.add = async(req, res)=>{
    let response = {};
    let body = '';

    req.on('data', (data)=>{
        body += data;
    });

    req.on('end', async function(){
        let post = JSON.parse(body);
        console.log(post)
        let newS = new Shopping(post);
        newS.save();

        if(post.product){
            response.status = 200; 
            response.message = 'Object successfully added';
        }else {
            response.status = 500; 
            response.message = 'Error while adding';
        }
        res.setHeader('Content-Type', 'application/json');
        console.log(JSON.stringify(response))
        res.end(JSON.stringify(response));
    });
};