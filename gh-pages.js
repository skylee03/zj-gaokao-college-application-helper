var ghpages = require('gh-pages');

ghpages.publish(
	'public',
	{
		branch: 'gh-pages',
		repo: 'https://github.com/skylee03/zj-gaokao-college-application-helper.git',
		user: {
			name: 'skylee',
			email: 'i@skylee.xyz'
		}
	},
	() => {
		console.log('Deploy Complete!')
	}    
)