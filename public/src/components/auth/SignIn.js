import Component from '../Component.js';

class SignIn extends Component {
    onRender(form) {
        const onSignIn = this.props.onSignIn;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const credentials = {
                userName: formData.get('user-name'),
                password: formData.get('password')
            };

            onSignIn(credentials);
        });
        
    }


    renderHTML() {
        return /*html*/`
        <form id="sign-in">
            <h1>Chroma</h1>
            <p>Sign In</p>
            <div>
                <input required name="user-name" type="text" placeholder="Your User Name">
            </div>
            
            <div>
                <input required name="password" type="text" placeholder="Password">
            </div>

            <input type="submit">
        </form>
    `;
    }
}

export default SignIn;