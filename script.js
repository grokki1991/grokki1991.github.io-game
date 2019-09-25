	let text = document.querySelector('.out');
	let info = document.querySelector('.info');
	let textBtn = document.querySelector('.text-btn');
	let input = document.querySelector('.text');
	let btn = document.querySelector('button');
	let form = document.querySelector('.form');
	let livesText = document.querySelector('.lives');
	let themeText = document.querySelector('.theme-text');
	let themeBox = document.querySelector('.theme-box');
	let themes = document.querySelectorAll('.this-theme');
	let points = document.querySelector('.points');
	let picture = document.querySelector('.picture');
	let point = 0;
	btn.onclick = function start() {
		themeBox.classList.add('theme-game');
		themeText.classList.add('active');
		// btn.innerHTML = 'Новая игра';
		btn.classList.add('no-active');
		let biology = [
		'генетика',
		'физиология',
		'цитоплазма',
		'метаболизм',
		'митохондрия',
		'холестерин',
		'зигота'
		];
		let history = [
		'буржуазия',
		'коммунизм',
		'крепостничество',
		'либерализм',
		'пантеон',
		'война',
		'самодержавие',
		'наполеон',
		'монархия'
		];
		let literature = [
		'вдохновение',
		'стихотворение',
		'достоевский',
		'баллада',
		'беллетристика',
		'гипербола',
		'драма',
		'роман'
		];
		let others = [
		'юмор',
		'беспредел',
		'компьютер',
		'телефон',
		'яблоко',
		'чемпион',
		'случайность',
		'бакенбарды',
		'деревня'
		];

		for (theme of themes) {
			theme.onclick = function theme() {
				picture.classList.add('no-active');
				points.innerHTML = 'Очки - ' + point;
				let thisTheme = this.getAttribute('data-theme');
				themeText.classList.remove('active');
				if (thisTheme == 'biology') {
					themes[0].classList.add('theme-color');
					themes[1].classList.remove('theme-color');
					themes[2].classList.remove('theme-color');
					themes[3].classList.remove('theme-color');
				}
				else if (thisTheme == 'history') {
					themes[1].classList.add('theme-color');
					themes[0].classList.remove('theme-color');
					themes[2].classList.remove('theme-color');
					themes[3].classList.remove('theme-color');
				}
				else if (thisTheme == 'literature') {
					themes[2].classList.add('theme-color');
					themes[0].classList.remove('theme-color');
					themes[1].classList.remove('theme-color');
					themes[3].classList.remove('theme-color');
				}
				else if (thisTheme == 'others') {
					themes[3].classList.add('theme-color');
					themes[0].classList.remove('theme-color');
					themes[1].classList.remove('theme-color');
					themes[2].classList.remove('theme-color');
				}

				if (thisTheme == 'biology') {
					form.classList.add('active');
					text.classList.add('active');
					info.classList.add('active');
					livesText.classList.add('active');
					form.classList.remove('no-active');
					text.classList.remove('no-active');
					livesText.classList.remove('no-active');
					input.value = '';
					let word = biology[Math.floor(Math.random() * biology.length)];
					let empty = [];
					for (i = 0; word.length > i; i++) {
						empty[i] = '_';
					}
					let think = word.length;
					let lives = 5;
					livesText.innerHTML = 'Количество жизней - ' + lives;
					info.innerHTML = '(Угадайте слово или букву)';
					text.innerHTML = empty.join(' ');
					textBtn.onclick = function() {
						if (think > 0 && lives > 0)  {
							let guess = input.value;
							guess = guess.toLowerCase();
							if (guess.length == 1) {
								for (let j = 0; j < word.length; j++) {
									if (guess === empty[j]) {
											input.value = '';
											info.innerHTML = 'Такая буква уже есть';
											break;
										}
									// Проверка на наличие, уже отгаданной буквы

									else if (word[j] === guess) {
										empty[j] = guess;
										think--;				
										text.innerHTML = empty.join(' ');
											if (think == 0) {
												input.value = '';
												point+=25;
												points.innerHTML = 'Очки - ' + point;
												return info.innerHTML = 'Победа! А ты молодец)';
											}
											else if (think >= 5) {
												info.innerHTML = 'Угадайте еще ' + think + ' букв';
											}
											else if (think === 1) {
												info.innerHTML = 'Угадайте еще ' + think + ' букву';
											}	
											else {
												info.innerHTML = 'Угадайте еще ' + think + ' буквы';
											}
											input.value = '';
										}
										// Конец условия на добавление буквы

								}
								if (!(word.includes(guess))) {
									input.value = '';
									lives--;
									livesText.innerHTML = 'Количество жизней - ' + lives;
									info.innerHTML = 'У вас осталось всего - ' + lives + ' жизни.' + ' Будьте аккуратны!';
								}
								// Конец цикла перебора букв
								input.value = '';
							}
							// Конец условия, если была введена одна буква

							else if (guess.length > 1 && (guess !== word)) {
								input.value = '';
								lives--;
								livesText.innerHTML = 'Количество жизней - ' + lives;
								if (lives >= 5) {
									info.innerHTML = 'Еще есть ' + lives + ' жизней.';
								}
								if (lives < 5 && lives >1 ) {
									info.innerHTML = 'Осталось ' + lives + ' жизни...' + ' Может попробуете сперва отгадать букву?';
								}
								else if (lives === 1) {
									info.innerHTML = 'У вас осталось всего - ' + lives + ' жизни.' + ' Будьте аккуратны!';
								}
								else if (lives === 0) {
									info.innerHTML = 'У вас ' + lives + ' жизней...' + ' Дела крайне плохи....';
								}	
							} 	

							else if (guess.length == 0) {
								info.innerHTML = 'Вы ничего не ввели!';
							} 

							else if (guess === word) {
								input.value = '';
								empty = guess;
								text.innerHTML = empty;
								think = 0;
								point+=100;
								points.innerHTML = 'Очки - ' + point;
								return info.innerHTML = 'Ух ты!! Быстро вы угадали, что это - ' + '<span style="color:red">' + guess + '</span>' + ' )';
							} 
							
						}
						// Конец проверки на количество угаданных букв и оставшихся жизней
						else if (lives === 0) {
							text.classList.add('no-active');
							livesText.classList.add('no-active');
							form.classList.add('no-active');
							point=0;
							return info.innerHTML = 'Вы проиграли... Не хотите ли попробовать снова?)';
						}
						else {
							input.value = '';
							return info.innerHTML = 'Можете сыграть еще :)';
						}
				}

				}
				else if (thisTheme == 'history') {
					form.classList.add('active');
					text.classList.add('active');
					info.classList.add('active');
					livesText.classList.add('active');
					form.classList.remove('no-active');
					text.classList.remove('no-active');
					livesText.classList.remove('no-active');
					input.value = '';
					let word = history[Math.floor(Math.random() * history.length)];
					let empty = [];
					for (i = 0; word.length > i; i++) {
						empty[i] = '_';
					}
					let think = word.length;
					let lives = 5;
					livesText.innerHTML = 'Количество жизней - ' + lives;
					info.innerHTML = '(Угадайте слово или букву)';
					text.innerHTML = empty.join(' ');
					textBtn.onclick = function() {
						if (think > 0 && lives > 0)  {
							let guess = input.value;
							guess = guess.toLowerCase();
							if (guess.length == 1) {
								for (let j = 0; j < word.length; j++) {
									if (guess === empty[j]) {
											input.value = '';
											info.innerHTML = 'Такая буква уже есть';
											break;
										}
									// Проверка на наличие, уже отгаданной буквы

									else if (word[j] === guess) {
										empty[j] = guess;
										think--;				
										text.innerHTML = empty.join(' ');
											if (think == 0) {
												input.value = '';
												point+=25;
												points.innerHTML = 'Очки - ' + point;
												return info.innerHTML = 'Победа! А ты молодец)';
											}
											else if (think >= 5) {
												info.innerHTML = 'Угадайте еще ' + think + ' букв';
											}
											else if (think === 1) {
												info.innerHTML = 'Угадайте еще ' + think + ' букву';
											}	
											else {
												info.innerHTML = 'Угадайте еще ' + think + ' буквы';
											}
											input.value = '';
										}
										// Конец условия на добавление буквы

								}
								if (!(word.includes(guess))) {
									input.value = '';
									lives--;
									livesText.innerHTML = 'Количество жизней - ' + lives;
									info.innerHTML = 'У вас осталось всего - ' + lives + ' жизни.' + ' Будьте аккуратны!';
								}
								// Конец цикла перебора букв
								input.value = '';
							}
							// Конец условия, если была введена одна буква

							else if (guess.length > 1 && (guess !== word)) {
								input.value = '';
								lives--;
								livesText.innerHTML = 'Количество жизней - ' + lives;
								if (lives >= 5) {
									info.innerHTML = 'Еще есть ' + lives + ' жизней.';
								}
								if (lives < 5 && lives >1 ) {
									info.innerHTML = 'Осталось ' + lives + ' жизни...' + ' Может попробуете сперва отгадать букву?';
								}
								else if (lives === 1) {
									info.innerHTML = 'У вас осталось всего - ' + lives + ' жизни.' + ' Будьте аккуратны!';
								}
								else if (lives === 0) {
									info.innerHTML = 'У вас ' + lives + ' жизней...' + ' Дела крайне плохи....';
								}	
							} 	

							else if (guess.length == 0) {
								info.innerHTML = 'Вы ничего не ввели!';
							} 

							else if (guess === word) {
								input.value = '';
								empty = guess;
								text.innerHTML = empty;
								think = 0;
								point+=100;
								points.innerHTML = 'Очки - ' + point;
								return info.innerHTML = 'Ух ты!! Быстро вы угадали, что это - ' + '<span style="color:red">' + guess + '</span>' + ' )';
							} 
							
						}
						// Конец проверки на количество угаданных букв и оставшихся жизней
						else if (lives === 0) {
							text.classList.add('no-active');
							livesText.classList.add('no-active');
							form.classList.add('no-active');
							point=0;
							return info.innerHTML = 'Вы проиграли... Не хотите ли попробовать снова?)';
						}
						else {
							input.value = '';
							return info.innerHTML = 'Можете сыграть еще :)';
						}
					}
				}
				//
				else if (thisTheme == 'literature') {
					form.classList.add('active');
					text.classList.add('active');
					info.classList.add('active');
					livesText.classList.add('active');
					form.classList.remove('no-active');
					text.classList.remove('no-active');
					livesText.classList.remove('no-active');
					input.value = '';
					let word = literature[Math.floor(Math.random() * literature.length)];
					let empty = [];
					for (i = 0; word.length > i; i++) {
						empty[i] = '_';
					}
					let think = word.length;
					let lives = 5;
					livesText.innerHTML = 'Количество жизней - ' + lives;
					info.innerHTML = '(Угадайте слово или букву)';
					text.innerHTML = empty.join(' ');
					textBtn.onclick = function() {
						if (think > 0 && lives > 0)  {
							let guess = input.value;
							guess = guess.toLowerCase();
							if (guess.length == 1) {
								for (let j = 0; j < word.length; j++) {
									if (guess === empty[j]) {
											input.value = '';
											info.innerHTML = 'Такая буква уже есть';
											break;
										}
									// Проверка на наличие, уже отгаданной буквы

									else if (word[j] === guess) {
										empty[j] = guess;
										think--;				
										text.innerHTML = empty.join(' ');
											if (think == 0) {
												input.value = '';
												point+=25;
												points.innerHTML = 'Очки - ' + point;
												return info.innerHTML = 'Победа! А ты молодец)';
											}
											else if (think >= 5) {
												info.innerHTML = 'Угадайте еще ' + think + ' букв';
											}
											else if (think === 1) {
												info.innerHTML = 'Угадайте еще ' + think + ' букву';
											}	
											else {
												info.innerHTML = 'Угадайте еще ' + think + ' буквы';
											}
											input.value = '';
										}
										// Конец условия на добавление буквы

								}
								if (!(word.includes(guess))) {
									input.value = '';
									lives--;
									livesText.innerHTML = 'Количество жизней - ' + lives;
									info.innerHTML = 'У вас осталось всего - ' + lives + ' жизни.' + ' Будьте аккуратны!';
								}
								// Конец цикла перебора букв
								input.value = '';
							}
							// Конец условия, если была введена одна буква

							else if (guess.length > 1 && (guess !== word)) {
								input.value = '';
								lives--;
								livesText.innerHTML = 'Количество жизней - ' + lives;
								if (lives >= 5) {
									info.innerHTML = 'Еще есть ' + lives + ' жизней.';
								}
								if (lives < 5 && lives >1 ) {
									info.innerHTML = 'Осталось ' + lives + ' жизни...' + ' Может попробуете сперва отгадать букву?';
								}
								else if (lives === 1) {
									info.innerHTML = 'У вас осталось всего - ' + lives + ' жизни.' + ' Будьте аккуратны!';
								}
								else if (lives === 0) {
									info.innerHTML = 'У вас ' + lives + ' жизней...' + ' Дела крайне плохи....';
								}	
							} 	

							else if (guess.length == 0) {
								info.innerHTML = 'Вы ничего не ввели!';
							} 

							else if (guess === word) {
								input.value = '';
								empty = guess;
								text.innerHTML = empty;
								think = 0;
								point+=100;
								points.innerHTML = 'Очки - ' + point;
								return info.innerHTML = 'Ух ты!! Быстро вы угадали, что это - ' + '<span style="color:red">' + guess + '</span>' + ' )';
							} 
							
						}
						// Конец проверки на количество угаданных букв и оставшихся жизней
						else if (lives === 0) {
							text.classList.add('no-active');
							livesText.classList.add('no-active');
							form.classList.add('no-active');
							point=0;
							return info.innerHTML = 'Вы проиграли... Не хотите ли попробовать снова?)';
						}
						else {
							input.value = '';
							return info.innerHTML = 'Можете сыграть еще :)';
						}
					}
				}
				//

				else if (thisTheme == 'others') {
					form.classList.add('active');
					text.classList.add('active');
					info.classList.add('active');
					livesText.classList.add('active');
					form.classList.remove('no-active');
					text.classList.remove('no-active');
					livesText.classList.remove('no-active');
					input.value = '';
					let word = others[Math.floor(Math.random() * others.length)];
					let empty = [];
					for (i = 0; word.length > i; i++) {
						empty[i] = '_';
					}
					let think = word.length;
					let lives = 5;
					livesText.innerHTML = 'Количество жизней - ' + lives;
					info.innerHTML = '(Угадайте слово или букву)';
					text.innerHTML = empty.join(' ');
					textBtn.onclick = function() {
						if (think > 0 && lives > 0)  {
							let guess = input.value;
							guess = guess.toLowerCase();
							if (guess.length == 1) {
								for (let j = 0; j < word.length; j++) {
									if (guess === empty[j]) {
											input.value = '';
											info.innerHTML = 'Такая буква уже есть';
											break;
										}
									// Проверка на наличие, уже отгаданной буквы

									else if (word[j] === guess) {
										empty[j] = guess;
										think--;				
										text.innerHTML = empty.join(' ');
											if (think == 0) {
												input.value = '';
												point+=25;
												points.innerHTML = 'Очки - ' + point;
												return info.innerHTML = 'Победа! А ты молодец)';
											}
											else if (think >= 5) {
												info.innerHTML = 'Угадайте еще ' + think + ' букв';
											}
											else if (think === 1) {
												info.innerHTML = 'Угадайте еще ' + think + ' букву';
											}	
											else {
												info.innerHTML = 'Угадайте еще ' + think + ' буквы';
											}
											input.value = '';
										}
										// Конец условия на добавление буквы

								}
								if (!(word.includes(guess))) {
									input.value = '';
									lives--;
									livesText.innerHTML = 'Количество жизней - ' + lives;
									info.innerHTML = 'У вас осталось всего - ' + lives + ' жизни.' + ' Будьте аккуратны!';
								}
								// Конец цикла перебора букв
								input.value = '';
							}
							// Конец условия, если была введена одна буква

							else if (guess.length > 1 && (guess !== word)) {
								input.value = '';
								lives--;
								livesText.innerHTML = 'Количество жизней - ' + lives;
								if (lives >= 5) {
									info.innerHTML = 'Еще есть ' + lives + ' жизней.';
								}
								if (lives < 5 && lives >1 ) {
									info.innerHTML = 'Осталось ' + lives + ' жизни...' + ' Может попробуете сперва отгадать букву?';
								}
								else if (lives === 1) {
									info.innerHTML = 'У вас осталось всего - ' + lives + ' жизни.' + ' Будьте аккуратны!';
								}
								else if (lives === 0) {
									info.innerHTML = 'У вас ' + lives + ' жизней...' + ' Дела крайне плохи....';
								}	
							} 	

							else if (guess.length == 0) {
								info.innerHTML = 'Вы ничего не ввели!';
							} 

							else if (guess === word) {
								input.value = '';
								empty = guess;
								text.innerHTML = empty;
								think = 0;
								point+=100;
								points.innerHTML = 'Очки - ' + point;
								return info.innerHTML = 'Ух ты!! Быстро вы угадали, что это - ' + '<span style="color:red">' + guess + '</span>' + ' )';
							} 
							
						}
						// Конец проверки на количество угаданных букв и оставшихся жизней
						else if (lives === 0) {
							text.classList.add('no-active');
							livesText.classList.add('no-active');
							form.classList.add('no-active');
							point=0;
							return info.innerHTML = 'Вы проиграли... Не хотите ли попробовать снова?)';
						}
						else {
							input.value = '';
							return info.innerHTML = 'Можете сыграть еще :)';
						}

				}
				//



			}
		}
		
	}

}