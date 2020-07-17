import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input')              
    checkNumInputs('input[name="user_phone"]');
    
    const message = {
        loading: 'Loading...',
        success: 'Thank you for your order',
        failure: 'Something error...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();

    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            if(item.getAttribute('data-calc') === 'end') {
                for( let key in state) {
                    formData.append(key, state[ key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                    setTimeout(() => {
                        document.querySelector('.popup_calc_end').style.display = 'none';
                    }, 3000);
                    document.body.style.overflow = '';
                });

                state = {};

            
        });
    });
};

export default forms;

