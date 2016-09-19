#####DEMO示例说明

###准备
我推荐使用sublime text作为编辑器，关于这个编辑器可以看我这篇文章。在package control中安装；
* Vuejs Snippets
* Vue Syntax Highlight

推荐使用npm管理,新建两个文件app.html,app.js,为了美观使用bootstrap，我们的页面模板看起来是这样:
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<div class="col-md-6 col-md-offset-3">
			<h1>Vue demo</h1>
			<div id="app">
			.......
			</div>
		</div>
	</div>
</body>
</html>
```
在app.js中准备一些数据:
```javascript
new Vue({
	el: '#app',
	data: {
		book: {
			id: 0,
			author: '',
			name: '',
			price: ''
		},
		books: [{
			id: 1,
			author: '曹雪芹',
			name: '红楼梦',
			price: 32.0
		}, {
			id: 2,
			author: '施耐庵',
			name: '水浒传',
			price: 30.0
		}, {
			id: '3',
			author: '罗贯中',
			name: '三国演义',
			price: 24.0
		}, {
			id: 4,
			author: '吴承恩',
			name: '西游记',
			price: 20.0
		}]
	}
})
```
在data里我们设置了两个数据book和book[] books，在app.html中我们只要这样就能获取到数据了:
```javascript
<tr v-for="book in books ">
	<td>{{book.id}}</td>
	<td>{{book.name}}</td>
	<td>{{book.author}}</td>
	<td>{{book.price}}</td>
</tr>
```
####v-on
vue.js通过v-on完成事件处理与绑定，比如为一个button绑定click事件，我们就可以这么写:
```javascript
<button v-on:click="doSomething">doSomething</button>
```
也可以这么写：
```javascript
<button @click="doSomething">doSomething</button>
```
我们需要为v-on传入事件参数,然后在vue的实例中声明doSomething这个方法就可以调用了:
```javascript
new Vue({
  el: '#app',
  methods: {
    doSomething: function () {
      /...../
    }
  }
})
```
接着上面书的例子，用v-model绑定form：
```javascript
<div id="add-book">
	<form action="" method="POST" role="form">
		<legend>添加书籍</legend>					
		<div class="form-group">
			<label for="">书名</label>
			<input type="text" class="form-control" placeholder="请输入书名" v-model="book.name">
		</div>
		<div class="form-group">
			<label for="">作者</label>
			<input type="text" class="form-control" placeholder="请输入作者" v-model="book.author">
		</div>
		<div class="form-group">
			<label for="">价格</label>
			<input type="text" class="form-control" placeholder="请输入价格" v-model="book.price">
		</div>
	  	<button class="btn btn-primary btn-block" v-on:click.stop.prevent="addBook">添加</button>
	</form>
</div>
```
在app.js中增加我们的addBook方法:
```javascript
methods: {
	addBook: function() {
		//计算书的id
		this.book.id = this.books.length + 1;
		this.books.push(this.book);
		//将input中的数据重置
		this.book = '';
	}
}
```
