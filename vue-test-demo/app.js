var app=new Vue({
	el: "#app",
	ready: function() {
		this.getDatas()
	},
	data: {
		book: {
			id: 0,
			author: '',
			name: '',
			price: ''
		},
		books: '',
		sortparam: ''

	},
	computed: {
		sum: function() {
			var result = 0;
			for (var i = 0; i < this.books.length; i++) {
				result += Number(this.books[i].price)
			};
			return result;
		}
	},
	methods: {
		addBook: function() {
			this.book.id = this.books.length + 1;
			this.books.push(this.book);
			this.book = '';
			console.log(this.books)
		},
		delBook: (book)=>{
			this.books.$remove(book);
		},
		sortBy: (sortparam) => {
			this.sortparam = sortparam
		},
		getDatas: function() {
			this.$http.get('books.json').then((response) => {
				// success callback
				this.$set('books', response.data)
			}, (response) => {
				// error callback
				console.log(response)
			});
		}
	}
})