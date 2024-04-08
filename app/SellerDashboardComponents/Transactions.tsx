import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import DataTable , { COL_TYPES } from 'react-native-datatable-component';


const data = [ 
                { name: 'Muhammad Rafeh', age: 21, gender: 'male',select:false },
                { name: 'Muhammad Akif', age: 22, gender: 'male' ,select:false},
                { name: 'Muhammad Umar', age: 21, gender: 'male' ,select:false},
                { name: 'Amna Shakeel', age: 22, gender: 'female',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Ammar', age: 20, gender: 'male',select:false },
                { name: 'Muhammad Moiz', age: 13, gender: 'male' ,select:false}
            ]


export default function Transactions() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
 


  return (
    <View style= {styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:'100%'}}>

      <DataTable
            data={data} // list of objects
            onRowSelect={(row:any) => {console.log('ROW => ',row)}}
            colNames={['name', 'age', 'gender','select']} //List of Strings
            colSettings={[
              { name: 'name', type: COL_TYPES.STRING, width: 300 }, 
              { name: 'age', type: COL_TYPES.INT, width: 200 }, 
              {name: 'gender', type: COL_TYPES.STRING, width:80},
              {name: 'select', type: COL_TYPES.CHECK_BOX,width:50}
            ]}//List of Objects
            noOfPages={data.length/10} //number
            backgroundColor={'#fff'} //Table Background Color
            headerLabelStyle={{ color: 'grey', fontSize: 12}} //Text Style Works
        />

      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'fff'
  }
})