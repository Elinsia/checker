import {useState} from 'react';

const useMyForm = (initialState, callback) => {
    const [input, setInput] = useState({
		...initialState
	});

    const handleSubmit = (e) => {
        e.preventDefault();
        callback(input);
    }

    const handleChange = (e) => {
        const _this = e.target;
        setInput({
            ...input,
            [_this.name]: _this.value
        });
	}

    return {
        input,
        handleSubmit,
        handleChange
    }

}

export default useMyForm;