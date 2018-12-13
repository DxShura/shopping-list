const routes = [
    {url : '/', controller : 'shopping.controller', action : 'index'},
];

const router = (req, res) =>{
    let index = routes.findIndex((route) => route.url === req.url);
    if(index === -1){
        res.end(); 
    }else{
        let controller = require(`${process.cwd()}/controllers/${routes[index].controller}`);
        let action = routes[index].action;
        controller[action](req, res);
    }
};

module.exports = router;