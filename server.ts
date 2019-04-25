import express from 'express';
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { json, urlencoded } from 'body-parser'
const app = express()

// Initialize Firebase
const config = {
	apiKey: "AIzaSyDiwa17ErEaYCXqWjzhyquw7izWo3L6pG8",
	authDomain: "oosd-8ea95.firebaseapp.com",
	databaseURL: "https://oosd-8ea95.firebaseio.com",
	projectId: "oosd-8ea95",
	storageBucket: "oosd-8ea95.appspot.com",
	messagingSenderId: "431408313965"
};

const db = firebase.initializeApp(config).database();

firebase.auth().signInAnonymously().catch(function (error) {
	// Handle Errors here.
	console.log(error)
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
});

app.post('/report', urlencoded({ extended: true }), json(), (req, res) => {
	const key = db.ref('suspect')
	key.once('value', id_increment => {
		const id = id_increment ? id_increment.numChildren() : 0
		const path = db.ref('suspect/' + id)
		const body = req.body as Report
		console.log(typeof body.speed)
		const report: Report = {
			id: id + "",
			region: body.region,
			lc: body.lc,
			longitude: body.longitude,
			latitude: body.latitude,
			speed: body.speed,
			time: body.time,
			report: body.report
		}
		path.set(report)
		res.send(200)
	})
})


app.listen(8000, () => { })

// let ref = db.ref('test').once('value')
// 	.then((snapshot) => {
// 		console.log(snapshot.val())
// 	})


// const key = db.ref('test')
// key.on('value', (snapshot) => {
// 	console.log(snapshot ? snapshot.val() : "null!")
// })

// let id = 0
// const key = db.ref('suspect')

// key.on('value', (snapshot) => {
// 	id = snapshot ? snapshot.numChildren() + 1 : 0
// 	console.log(id)



// })

// setInterval(() => {
// 	write()
// }, 2000);


// function write() {
// 	const value = db.ref('suspect/' + id)
// 	value.set({
// 		'id': id ? id : 999,
// 		'region': 'region',
// 		'lc': 'lc',
// 		'longitude': 'longitude',
// 		'latitude': 'latitude',
// 		'report': 'report',
// 		'time': 'time',
// 		'speed': 'speed'
// 	})
// }

// console.log(ref)
// firebase.database().app.
// DatabaseReference mRootRef = FirebaseDatabase.getInstance().getReference();




// 


/*
abstract class Car {
	private speed: number = 0
	private name: string = ''
	constructor(name: string, speed: number) {
		this.name = name
		this.speed = speed
	}

	report() {
		// ajax database
	}
	getName() { return this.name }
	getSpeed() { return this.speed }

	private setSpeed() {
		if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', (event) => {
				const tmp = event.accelerationIncludingGravity
				var motion = document.getElementById('motion')
				var x = event.accelerationIncludingGravity.x;
				var y = event.accelerationIncludingGravity.y;
				var r = event.rotationRate;
				// var html = '<h1 class="text-white bg-dark" style="text-align: center;font-size: 100px">' + x + '</h1>'
				// motion.innerHTML = html
				motion.innerText = `value x: ${this.speed}`
			})
		}

	}
}



class Bus extends Car {
	constructor() {
		super("", 0)
	}


}


class Car {
	sendReport(Prob: Problem) {
		Prob.guilty()
	}
}

class Problem {
	guilty() {}
}

*/