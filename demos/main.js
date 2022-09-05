function MyObj(){
	var a = 3;
	this.do = () => {
		console.log(this);
	}
}


let obj = new MyObj();
obj.do();