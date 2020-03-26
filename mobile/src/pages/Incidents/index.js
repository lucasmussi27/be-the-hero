import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logImg from "../../assets/logo.png";
import api from "../../services/api";
import styles from "./styles";

export default function Incidents() {
  const[incidents, setIncidents] = useState([]);
  const[total, setTotal] = useState(0);
  const[page, setPage] = useState(1);
  const[loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function loadIncidents() {
    if(loading) return;
    if(total > 0 && incidents.length === total) return;
    setLoading(true); 
    const response = await api.get('incidents', {
      params: { page }
    });
    
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logImg} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total}</Text> incidents.
        </Text>
      </View>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>Choose one of these incidents and start saving the day.</Text>
    
      <FlatList 
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        // showsVerticalScrollIndicator={true}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
          
            <Text style={styles.incidentProperty}>INCIDENT:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={() => navigateToDetail(incident)}
            >
              <Text styles={styles.detailsButtonText}>
                <Feather name="arrow-right" size={16} color="#e02041" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}