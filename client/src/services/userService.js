class UserService{
    static async signin(email, password){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        };

        const res = await fetch('http://localhost:8080/signin', requestOptions);
        const data = await res.json();
        localStorage.setItem('token', JSON.stringify(data.token));
        return data.user;
    };
}

export default UserService;