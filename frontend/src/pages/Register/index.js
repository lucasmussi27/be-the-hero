import React, { useState } from 'react';
import { FiArrowLeft } from "react-icons/fi"
import "./styles.css";

import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from 'react-router-dom';

import api from "../../services/api";

export default function Register() {
	const[name, setName] = useState('');
	const[email, setEmail] = useState('');
	const[whatsapp, setWhatsapp] = useState('');
	const[city, setCity] = useState('');
	const[uf, setUf] = useState('');
	
	const history = useHistory();

	async function handleRegister(event) {
		event.preventDefault();
		try {
			const response = await api.post('ongs', { 
				name, email, whatsapp, city, uf 
			});
			alert(`Your Access ID: ${response.data.id}`);
			history.push('/');
		} catch(error) {
			alert('Error in register, try again.');
		}
	}

  return (
    <div className="register-container">
      <div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero"/>
					<h1>Register</h1>
					<p>Make your registration, enter in the plataform and help people to find your ONG's incidents</p>
					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#e02041" />
						Back to Logon
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input 
						placeholder="ONG Name" 
						value={name}
						onChange={e => setName(e.target.value)}	
					/>
					<input 
						type="email" 
						placeholder="Email" 
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<input 
						placeholder="Whatsapp" 
						value={whatsapp}
						onChange={e => setWhatsapp(e.target.value)}
					/>

					<div className="input-group">
						<input 
							placeholder="City" 
							value={city}
							onChange={e => setCity(e.target.value)}
						/>
						<input 
							placeholder="UF"
							style={{ width: 80 }}
							value={uf}
							onChange={e => setUf(e.target.value)}
						/>
					</div>
					<button type="submit" className="button">Register</button>
				</form>
			</div>
    </div>
  );
}
