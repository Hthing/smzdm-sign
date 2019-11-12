/**
 * 发邮件 工具类
 * xuess<wuniu2010@126.com>
 * 2018年03月29日 修改
 */
const { emailName, emailPassword, toEmail, timeZone } = require("../config"); //配置文件
const nodemailer = require('nodemailer');//发邮件
const moment = require("moment-timezone"); //日期
const { ascii2native } = require('./utils'); //工具类
moment.tz.setDefault(timeZone);

const transporter = nodemailer.createTransport({
	//https://nodemailer.com/smtp/well-known/ 支持列表
	//https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json 配置
	// host: "smtp.exmail.qq.com", // 主机
	service: 'qq',
	port: 465, // SMTP 端口
	secureConnection: true, // 使用 SSL
	auth: {
		user: emailName,
		pass: emailPassword
	}
});


/**
 * 发邮件 普通 html
 * @param {Object} title 标题
 * @param {Object} text 内容
 */
function sendMailForHtml(title, text) {
	//今天日期
	let now = moment();
	let today = moment().format('YYYY-MM-DD');
	let mailOptions = {
		from: emailName, // 发件地址
		to: toEmail, // 收件列表
		subject: `${title}(${today})`, // 标题
		//text和html两者只支持一种
//		text: ascii2native(text) // 内容
		html: '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+ text // html 内容
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if(error) {
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
}


module.exports = {
	mailSend: sendMailForHtml
};