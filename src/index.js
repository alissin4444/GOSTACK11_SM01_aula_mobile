import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => setProjects(response.data));
  }, []);

  async function handleAddProject() {
    const response = await api.post("projects", {
      title: `new repo ${new Date()}`,
      owner: "Alissin Santos",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#dfe6e9" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Projects</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project} key={project.id}>
              {project.title}
            </Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar repositório</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dfe6e9",
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    color: "#2d3436", // #576574
  },
  project: {
    fontSize: 14,
    marginBottom: 5,
    color: "#576574",
  },
  button: {
    height: 50,
    backgroundColor: "#2d3436",
    borderRadius: 25,
    margin: 20,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#bdc3c7",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 14,
  },
});
