class HomeController{

    async index(req, res){
        res.send("API Users! - Dionatan");
    }
    async validate(req, res){
        res.send("ok")
    }
}

module.exports = new HomeController();