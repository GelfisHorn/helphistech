import './style.css'

export default function blogFormTemplate(data) {
    
    const { blogTitle, blogUrl, message, fullName, phone, email } = data;
    
    return `
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="x-apple-disable-message-reformatting" />
                            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                <title></title>
                            </head>

                            <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
                                <div class="ie-container">
                                    <div class="mso-container">
                                        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr style="vertical-align: top">
                                                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;">


                                                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                                                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                                                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;">

                                                                            <td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top">
                                                                                <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                                                                                    <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                                                                                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                                                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px 10px 4px;font-family:arial,helvetica,sans-serif;" align="left">

                                                                                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                                                <tr>
                                                                                                                    <td style="padding-right: 0px;padding-left: 0px;" align="left">

                                                                                                                        <img align="left" border="0" src="https://i.imgur.com/3MFxG3k.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 35%;max-width: 173.6px;" width="173.6" />

                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </table>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>

                                                                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                                                                                            <h1 style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 23px; font-weight: 400;">Nuevo contacto de Servicios</h1>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>

                                                                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                                                                                            <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                                                                <p style="line-height: 140%;">Hay un cliente interesado en: <a href="https://helphistech.com/website/${blogUrl}" target="_blank">${blogTitle}</a> de los servicios de HelphisTech.</p>
                                                                                                            </div>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>

                                                                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                                                                                            <div style="font-size: 17px; font-weight: 400; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                                                                <p style="line-height: 140%;">El cliente dejó un mensaje:</p>
                                                                                                            </div>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>

                                                                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                                                                                            <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                                                                <p style="line-height: 140%;">${message}</p>
                                                                                                            </div>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>

                                                                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                                                                                            <h3 style="margin: 0px; line-height: 80%; text-align: left; word-wrap: break-word; font-size: 18px; font-weight: 400;">Datos de contacto:</h3>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>

                                                                                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                                                                                                            <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                                                                <p style="line-height: 140%;">Nombre: ${fullName}</p>
                                                                                                                <p style="line-height: 140%;">Teléfono: ${phone}</p>
                                                                                                                <p style="line-height: 140%;">Correo electrónico: <a rel="noopener" href="mailto:${email}" target="_blank">${email}</a></p>
                                                                                                            </div>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr></table></td></tr></table>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </td></tr></table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </body>

                        </html>
        `
}