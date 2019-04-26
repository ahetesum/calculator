/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button,TouchableOpacity} from 'react-native';

export default class App extends Component{

  constructor()
  {
    super()
    this.state={
      resultText :'',
      calculationText: '',
    }

    this.oparators=['D','+','-','*','/']

  }

  calculateResult()
  {
    const text = this.state.resultText
    console.log(text)

    this.setState({
      calculationText: eval(text)
    })
  }

  isValidate()
  {
    let text = this.state.resultText
    switch(text.slice(-1))
    {
      case '*':
      case '+':
      case '-':
      case '/':
       return false
    }
    return true
  }

  onButtonPressed(text)
  {
    console.log(text)

    if(text == '=')
    {
        return this.isValidate() && this.calculateResult()
    }

    this.setState(
      {
        resultText: this.state.resultText + text
      }
    )
  }

  onOprrandsPressed(operation)
  {
    switch(operation)
    {
      case 'D':
        let text= this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break
        case '+':
        case '-':
        case '*':
        case '/':
        const lastCharecter = this.state.resultText.split('').pop()
        if(this.oparators.indexOf(lastCharecter)>0) return

        if(this.state.resultText== "") return
        this.setState({
          resultText: this.state.resultText + operation 
        })
        break

    }
  }
  render() {

    let rows=[]
    let nums=[[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]

    for(let i=0;i<4;i++)
    {
      let row=[]
      for(let j=0;j<3;j++)
      {
          row.push(<TouchableOpacity style={styles.btn} 
            onPress = {()=> this.onButtonPressed(nums[i][j])} >
          <Text style={styles.btnText}>{nums[i][j]}</Text></TouchableOpacity>)
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }


    let ops=[]
    for(let i=0;i<5;i++)
    {
      ops.push(<TouchableOpacity style={styles.btn} 
      onPress = {()=> this.onOprrandsPressed(this.oparators[i])}  >
        <Text style={styles.btnText}>{this.oparators[i]}</Text></TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operators}>
          {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row:{
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result:{
    flex: 2,
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  calculation:{
    flex:1,
    backgroundColor: 'green',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  calculationText:{
    fontSize:20,
    color:'white'
  },
  resultText:{
    fontSize:26,
    color:'white'
  },
  btn:{
    flex:1,
    justifyContent:'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  btnText:{
    fontSize: 30,
  },
  buttons:{
      flex: 7,
      flexDirection: 'row'
  },
  numbers:{
    flex: 3,
    backgroundColor: 'yellow'
  },
  operators:{
    flex:1,
    backgroundColor: 'blue'
  },

});
