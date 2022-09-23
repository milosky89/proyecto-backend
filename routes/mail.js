var express = require('express');
var app = express();
'use strict';
const nodemailer = require('nodemailer');
//token
// const jwt = require('../helpers/jwt');
const jwt = require('jsonwebtoken');
const persona = require('../models/persona');
 
//Rutas
app.post('/cambiarPassword', (req, res) => {
 
    let body = req.body;
    let to = body.to;
 

    const personaDB = persona.findOne({
        email: to
    }, (err, personaDB) => {
 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
 
        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario no existe en la base de datos',
                errors: err
            });
        }
 
        if (personaDB) {
            // AQUI COLOCAS EL RESTANTE DEL CODIGO PARA EL ENVIO DEL CORREO
             //Generar Token
    const token = jwt.sign({ to }, process.env.JWT_SECRET, { expiresIn: 1800 }); //30 min
 
 
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    //process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
 
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'camilolopera1@gmail.com', // generated ethereal user
            pass: 'eghtuewtazteoyfc' // generated ethereal password
        }
    });
 
    // setup email data with unicode symbols
    const mailOptions = {
        from: 'camilolopera1@gmail.com', // sender address
        to: `${body.to}`, // list of receivers
        subject: ' Hello ✔', // Subject line
        text: '', // plain text body:
        html: `<table cellspacing="0" cellpadding="0" border="0" style="color:#333;background:#fff;padding:0;margin:0;width:100%;font:15px/1.25em 'Helvetica Neue',Arial,Helvetica"> <tbody><tr width="100%"> <td valign="top" align="left" style="background:#eef0f1;font:15px/1.25em 'Helvetica Neue',Arial,Helvetica"> <table style="border:none;padding:0 18px;margin:50px auto;width:500px"> <tbody> <tr width="100%" height="60"> 
        <td valign="top" align="left" style="border-top-left-radius:4px;border-top-right-radius:4px;background:#27709b;padding:10px 18px;text-align:center"> 
           </td> </tr> <tr width="100%"> <td valign="top" align="left" style="background:#fff;padding:18px">
      
       <h1 style="font-size:20px;margin:16px 0;color:#333;text-align:center"> Recupera tu contraseña </h1>
      
       <p style="font:12px/1.25em 'Helvetica Neue',Arial,Helvetica;color:#333;text-align:center"> Hemos recibido una petición para cambiar tu contraseña, solo haz click en el botón y sigue las instrucciones para recuperarla.</p>
      
       <div style="background:#f6f7f8;border-radius:3px"> <br>
      
      
       <p style="font:15px/1.25em 'Helvetica Neue',Arial,Helvetica;margin-bottom:0;text-align:center"> <a href="http://localhost:4200/nuevaClave/${token}" style="border-radius:3px;background:#3aa54c;color:#fff;display:block;font-weight:700;font-size:16px;line-height:1.25em;margin:24px auto 6px;padding:10px 18px;text-decoration:none;width:180px" target="_blank"> Recuperar contraseña</a> </p>
         
         <p style="font:11px/1.25em 'Helvetica Neue',Arial,Helvetica;color:#333;text-align:center"> Si tienes problemas con el botón, copia y pega el siguiente enlace en tu navegador: <br><br>
           http://localhost:4200/nuevaClave/${token}
         </p>
      
       <br><br> </div>
       <p style="font:14px/1.25em 'Helvetica Neue',Arial,Helvetica;color:#333;text-align:center"> <strong>¿No has sido tú?</strong> No te preocupes, solo ignora este correo. <br><br>
         <a href="mailto:camilolopera1@gmail.com?subject=Reporto abuso" style="color:#306f9c;text-decoration:none;font-weight:bold" target="_blank">Reportar abuso »</a> </p>
      
       </td>
      
       </tr>
      
       </tbody> </table> </td> </tr></tbody> </table>`
        //html: '<b><br>Para restablecer tu contraseña, <br><br> ingresa el siguiente código: <br><div class="danger">' + token + '</div> <br><br> y tu nueva contraseña en: http://localhost:4200/#/resetpassword <br><br>  Gracias!  <br>  </b>' // html body
    };
 
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error correo no pudo ser enviado',
                errors: err
            });
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
 
        res.status(200).json({
            ok: true,
            message: 'paso el hpEl correo fue enviado correctamente',
            token: token
        });        
    });
        }
    });   
})
 
module.exports = app;