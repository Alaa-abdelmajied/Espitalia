import React from 'react';
import { View, StyleSheet , Text} from 'react-native';
import { DataTable } from 'react-native-paper';

 function App() {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Doctor Name</DataTable.Title>
          <DataTable.Title>From</DataTable.Title>
          <DataTable.Title >To</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Alaa</DataTable.Cell>
          <DataTable.Cell>10am</DataTable.Cell>
          <DataTable.Cell>12pm</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Aly</DataTable.Cell>
          <DataTable.Cell>2pm</DataTable.Cell>
          <DataTable.Cell >2:45pm</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Malak</DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell ></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Amir</DataTable.Cell>
          <DataTable.Cell>4pm</DataTable.Cell>
          <DataTable.Cell >5:45pm</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Anwar</DataTable.Cell>
          <DataTable.Cell>2pm</DataTable.Cell>
          <DataTable.Cell >2:45pm</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Youssef</DataTable.Cell>
          <DataTable.Cell>2pm</DataTable.Cell>
          <DataTable.Cell >2:45pm</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
  },
});
export default App;