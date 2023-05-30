import { TextInput, View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, invalid, textInputConfig }) {

   const inputStyles =[styles.input];

   if(textInputConfig && textInputConfig.multiline){
    inputStyles.push(styles.inputMultiline)
   }

   if (invalid) {
    inputStyles.push(styles.inValidInput);
   }

    return (
        <View style={[styles.inputContainer, style ]}>
            <Text style={[styles.label, invalid && styles.inValidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 5,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top'
    },
    inValidLabel:{
        color: GlobalStyles.colors.error500
    },
    inValidInput:{
        backgroundColor: GlobalStyles.colors.error500
    }
});