import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import './data.css';




const Data = () => {
    const [value, onChange] = useState(new Date());
    const [showInfosSalle1, setShowInfosSalle1] = useState(false);
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [decibel, setDecibel] = useState('');
    const [quality, setQuality] = useState('');

    const toggleInfosSalle1 = () => {
        setShowInfosSalle1(!showInfosSalle1);
    };

   useEffect(() => {
    const fetchData = () => {
        fetch('http://192.168.3.35:3001/mesures')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de requête');
                }
                return response.json();
            })
            .then(data => {
                // Trier les données par ID en ordre décroissant
                data.sort((a, b) => b.id - a.id);

                // Récupérer les données de la dernière entrée
                const latestData = data[0];
                console.log(latestData);

                // Mettre à jour les états avec les données de la dernière entrée
                setTemperature(latestData.temperature);
                setHumidity(latestData.humidite);
                setDecibel(latestData.decibel);
                setQuality(latestData.qualite);
            })
            .catch(error => {
                console.error('Erreur lors de la requête:', error);
            });
    };

    // Appeler fetchData au montage et ensuite toutes les 30 secondes
    fetchData();
    const interval = setInterval(fetchData, 3000);

    // Nettoyer l'intervalle lors du démontage
    return () => clearInterval(interval);
}, []);

    const getColor = (decibel) => {
        if (decibel < 50) {
            return 'green';
        } else if (decibel < 70) {
            return 'yellow';
        } else {
            return 'red';
        }
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <p>Température: {temperature}°</p>
            </Menu.Item>
            <Menu.Item>
                <p>Humidité: {humidity}%</p>
            </Menu.Item>
            <Menu.Item>
                <p>Niveau sonore: {decibel} dB</p>
            </Menu.Item>
            <Menu.Item>
                <p>Qualité de l&apos;air: {quality} ppm</p> {/* Correction de la faute de frappe */}
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="main">
            <div className="temperatures">
                <h2>{temperature}</h2>
                <div className='db'>
                    <h4> Niveau sonore : </h4>
                    <p>{decibel} dB</p>
                </div>
                <div className="quality">
                    <h4>Qualité de l&apos;air</h4>
                    <p>{quality}</p>
                </div>
                <div className="humidity">
                    <h4>Humidité de l&apos;air</h4>
                    <p>{humidity}</p>
                </div>
            </div>
            <div className="pins">
                <div className='filtre'>
                    <h3>Filtre</h3>
                    <select>
                        <option value="option1">db</option>
                        <option value="option2">%</option>
                        <option value="option3">ppm</option>
                    </select>
                </div>
                <ul>
                    <li>
                        <h4 className="salle-button">Salle 1</h4>
                        <h4 className="degre">{temperature}°</h4>
                        <div className="circle" style={{ backgroundColor: getColor(decibel) }}></div>
                        <div className='details'>
                            <Dropdown overlay={menu} trigger={['click']} visible={showInfosSalle1}>
                                <button className="dropdown-btn" onClick={toggleInfosSalle1}>
                                    <DownOutlined />
                                </button>
                            </Dropdown>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="calendar">
                <Calendar onChange={onChange} value={value} />
            </div>
        </div>
    );
};

Data.propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func.isRequired
};

export default Data;
