var express = require('express'),
    router = express.Router(),
    nodemailer = require('nodemailer'),
    _http = require('http'),
    request = require("request");
    
    //MLAB
var mongojs = require('mongojs');
var db = mongojs('mongodb://fran:fran@ds145128.mlab.com:45128/rep365')

var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: '@gmail.com',
        pass: ''
    }
});

var template = `<strong>template</strong><br><img src="https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png" alt="">`;

router.get('/', function(req, res) {
    res.render('index.html');
});

/*router.get('/placa', function(req, res) {
    return _http.get({
        host: 'http://www.informaciondetallada.com',
        path: '/placas/rest/placa/'
    }, function(res) {
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(body);
        });
    })
});*/

router.post('/send-email-contactus', function(req, res) {
    console.log('"' + req.body.name + '"' + ' <' + req.body.email + '>,')
    var mailOpts = {
        from: '<' + req.body.email + '>', //grab form data
        to: 'jairo85cd@gmail@gmail.com',
        subject: req.body.subject + ' - ' + req.body.email,
        text: req.body.message + " Info de contacto:" + req.body.email + " - " + req.body.phone
    }
    smtpTransport.sendMail(mailOpts, function(error, info) {
        if (error) {
            console.log(error);
            res.json({ yo: 'error' });
        } else {
            console.log('Message sent: ' + info);
            res.json({ yoo: info.message });
        };
    });
});


router.post('/auth-signup', function(req, res) {
    //res.json(req.body);
    var options = {
        method: 'POST',
        url: 'https://rep365.auth0.com/dbconnections/signup',
        headers: { 'content-type': 'application/json' },
        body: {
            client_id: 'daZBFFiuav04WCkiJ872hgcR4JZzF',
            connection: 'rep365DB',
            email: req.body.email,
            password: req.body.password,
            user_metadata: { name: req.body.name }
        },
        json: true
    };
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        //console.log(body);
        res.json(body);
    });
});

//CONEXION MLAB
/*
//GET muestra placas**TEST PARA PLACAS**
router.get('/muestra', function(req,res,next){
   // res.send('REPUESTOS');
    db.placamuestra.find(function(err,repuestos){
        if(err){
            res.send(err);
        }else{
            res.json(repuestos[0].JBB0131);
        }
})
});


*/
//GET FORM PLACA - COMBUSTIBLE
router.get('/fpcombustible', function(req,res,next){
   // res.send('REPUESTOS');
    db.combustible.find(function(err,repuestos){
        if(err){
            res.send(err);
        }else{
            res.json(repuestos);
        }
})
});
//GET FORM PLACA - MARCAS
router.get('/fpmarcas', function(req,res,next){
   // res.send('REPUESTOS');
    db.marcas.find(function(err,repuestos){
        if(err){
            res.send(err);
        }else{
            res.json(repuestos);
        }
})
});
//GET FORM PLACA - TRACCIONES
router.get('/fptracciones', function(req,res,next){
   // res.send('REPUESTOS');
    db.tracciones.find(function(err,repuestos){
        if(err){
            res.send(err);
        }else{
            res.json(repuestos);
        }
})
});
//GET FORM PLACA - TRANSMISIONES
router.get('/fptransmisiones', function(req,res,next){
   // res.send('REPUESTOS');
    db.transmisiones.find(function(err,repuestos){
        if(err){
            res.send(err);
        }else{
            res.json(repuestos);
        }
})
});







//GET PEDIDOS
router.get('/pedidos/:user', function(req,res,next){
   // res.send('REPUESTOS');

    db.repuestos.find({user:req.params.user},function(err,pedidos){
        if(err){
            res.send(err);
        }else{
            res.json(pedidos);
        }
})
});

//GET PEDIDOS - VENDEDOR
router.get('/pedidos', function(req,res,next){
    db.repuestos.find(function(err,pedidos){
        if(err){
            res.send(err);
        }else{
            res.json(pedidos);
            
        }
})
});

//GET PEDIDOS - VENDEDOR -REFRESH
router.get('/pedidosref/:id', function(req,res,next){
    db.repuestos.find(function(err,pedidos){
        console.log('---------------------------'+req.params.id);
        if(err){
        res.send(err);}else{
                for(var j =0; j< pedidos.length;j++){
                    if(pedidos[j].id_carrito == req.params.id){
                               pedidos.splice(0, j+1);
                            }else{
                            }
                }
                if(pedidos){res.json(pedidos);}
            
            
        }
})
});

//GET PEDIDOS COT - VENDEDOR 
router.get('/getPedidosCot/:id', function(req,res,next){
    db.cot_pedido.find({id_carrito:req.params.id.toString},function(err,pedidos){
        if(err){
            res.send(err);}else{res.json(pedidos);
        }
})
});

//SAVE UN PEDIDO COMPLETO
router.post('/addrepuestocarrito', function(req,res,next){
    var item = req.body;
            db.repuestos.save(item,function(err, item){
                if(err){
                    res.send(err);
                }
                res.json(item);
            });
    
});

//SAVE ITEM PEDIDO VENDEDOR
router.post('/additemvend', function(req,res,next){
    var item = req.body;
            db.cot_item.save(item,function(err, item){
                if(err){
                    res.send(err);
                }
                res.json(item);
            });
    
});

//SAVE COMPLETO PEDIDO VENDEDOR
router.post('/addCompVend', function(req,res,next){
    var item = req.body;
            db.cot_pedido.save(item,function(err, item){
                if(err){
                    res.send(err);
                }
                res.json(item);
            });
    
});

//GET REPUESTOS
router.get('/repuestos/user', function(req,res,next){
   // res.send('REPUESTOS');
    db.carrito.find(function(err,repuestos){
        if(err){
            res.send(err);
        }else{
            res.json(repuestos);
        }
})
});

//GET VENDEDORES
router.get('/vendedores', function(req,res,next){
    db.vendedor.find(function(err,repuestos){
        if(err){
            res.send(err);
        }else{
            res.json(repuestos);
        }
})
});

//GET REPUESTO

router.get('/pedido/:id', function(req,res,next){
    console.log(req.params.id);
   db.carrito.find({id_carrito:req.params.id},function(err,task){
        if(err){
            res.send(err);
        }else{
            res.json(task);
        }
});
});

//GET UN ITEM DEL PEDIDO

router.get('/itemPedido/:id', function(req,res,next){
    var id=req.params.id.toString();
    db.carrito.findOne({_id:mongojs.ObjectId(id)},function(err,task){
        if(err){
            res.send(err);
        }else{
            res.json(task);
        }
});
});

//GET MI PERFIL

router.get('/perfil/:id', function(req,res,next){
    //res.send('task');
    db.users_perfil.findOne({user_id:req.params.id},function(err,task){
        if(err){
            res.send(err);
        }else{
            res.json(task);
        }
});
});

//GET PLACA
router.get('/placa/:id', function(req,res,next){
    //res.send('task');
    db.vehiculo.findOne({placa:req.params.id},function(err,placa){
        if(err){
            res.send(err);
        }else{
            res.json(placa);
        }
});
});

//GET VENDEDOR
router.get('/vendedor/:id', function(req,res,next){
    db.vendedor.findOne({email:req.params.id},function(err,placa){
        if(err){
            res.send(err);
        }else{
            res.json(placa);
        }
});
});

//GET VENDEDOR
router.get('/checkV/:id', function(req,res,next){
    db.vendedor.findOne({email:req.params.id},function(err,check){
        if(err){
            res.send(err);
        }else{
            res.json(check);
        }
});
});

//SAVE 
router.post('/addpedidocarrito', function(req,res,next){
    var item = req.body;


            db.carrito.save(item,function(err, item){
                if(err){
                    res.send(err);
                }
                res.json(item);
            });
    
});


//SAVE PLACA
router.post('/addplaca', function(req,res,next){
    var item = req.body;
            db.vehiculo.save(item,function(err, item){
                if(err){
                    res.send(err);
                }
                res.json(item);
            });
    
});

//SAVE PRIMER PERFIL
router.post('/saveperfil', function(req,res,next){
    var item = req.body;

    //console.log(item);
            db.users_perfil.save(item,function(err, item){
                if(err){
                    res.send(err);
                }
                res.json(item);
            });
    
});
//SAVE VENDEDOR
router.post('/addvendedor', function(req,res,next){
    var item = req.body;
    //console.log(item);
            db.vendedor.save(item,function(err, item){
                if(err){
                    res.send(err);
                }
                res.json(item);
            });
        //}
    
});

//SAVE Vehiculo
router.post('/addvehiculo', function(req,res,next){
    //res.send('task');
    var vehiculo = req.body;
	var vehiculoCol = db.collection('vehiculo');
            vehiculoCol.save(vehiculo,function(err, vehiculo){
                if(err){
                    res.send(err);
                }
                res.json(vehiculo);
            });
    
});

//UPDATE PERFIL
router.put('/editperfil/:id', function(req,res,next){
    var perfil = req.body;
    var updPerfil = {};
//console.log(perfil);
    if(perfil.nombre){
        updPerfil.nombre = perfil.nombre;
    }
    if(perfil.apellido){
        updPerfil.apellido=perfil.apellido;
    }
    if(perfil.telefono){
        updPerfil.telefono = perfil.telefono;
    }
    if(!updPerfil){
        res.status(400);
        res.json({"error":"BadData"});
    }else{
        //console.log(perfil);
        db.users_perfil.update({user_id:req.params.id},updPerfil,{},function(err,task){
        if(err){
            res.send(err);
        }else{
            res.json(perfil);
        }
    });
    }
    
});

//DELETE PEDIDO
router.delete('/deletePedido/:id', function(req,res,next){
    console.log(req.params.id);
    var id=req.params.id.toString();
    db.repuestos.remove({id_carrito:id},function(err,pedido){
        if(err){
            res.send(err);
        }else{
            res.json(pedido);
        }
    });
    
});

//DELETE TIENDA
router.delete('/deleteTienda/:id', function(req,res,next){
    console.log(req.params.id);
    var id=req.params.id.toString();
    db.vendedor.remove({_id:mongojs.ObjectId(req.params.id)},function(err,tienda){
        if(err){
            res.send(err);
        }else{
            res.json(tienda);
        }
    });
    
});
// END-CONEXION MLAB


module.exports = router;