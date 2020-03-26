import React, { useState } from 'react';
import './styles.css';
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from "../../services/api";

export default function NewIncident() {
	const[title, setTitle] = useState('');
	const[description, setDescription] = useState('');
	const[value, setValue] = useState('');
	const ongId = localStorage.getItem('ongId')
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await api.post('incidents', { 
				title, description, value 
			}, { headers: { Authorization: ongId }});
			alert('A new incident was registered!');
			history.push('/profile');
		} catch (error) {
			alert('Error during registering new incident, try again.');
		}
	}

	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero"/>
					<h1>Register new Incident</h1>
					<p>Describe in details the incident to find a hero to solve it.</p>
					<Link className="back-link" to="/profile">
						<FiArrowLeft size={16} color="#e02041" />
						Back to profile
					</Link>
				</section>
				<form onSubmit={handleSubmit}>
					<input 
						placeholder="Incident's Title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<textarea 
						placeholder="Description"
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<input 
						placeholder="Value"
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					<button type="submit" className="button">Register</button>
				</form>
			</div>
    </div>
  );
}
