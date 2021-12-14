import styled from 'styled-components/native';

export const Background = styled.View`
    flex:1;
   background-color: #fff;
`;

export const Container = styled.KeyboardAvoidingView`
    flex:1;
    align-items: center;
    justify-content: center;
`;

export const LogoText = styled.Text`
    margin-bottom: 15px;
    font-size: 25px;
    font-weight: bold;
    color: rgba(0,255,15,0.80);
    margin-right: 15px;
    margin-top: 15px;
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const AreaInput = styled.View`
    flex-direction: row;
`;
 
export const Input = styled.TextInput.attrs({
    placeholderTextColor:'rgba(0,0,0,0.6)'
})`
    background: rgba(0,0,0,0.20);
    width: 90%;
    font-size: 17px;
    color: #000;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 7px;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #00b94a;
    width: 90%;
    height: 45px;
    border-radius: 7px;
`;

export const SubmitText = styled.Text`
    font-size: 17px;
    color: #131313;
`;

export const AddButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #ff0000;
    width: 90%;
    height: 45px;
    border-radius: 7px;
    margin-top: 10px;
`;

export const CancelText = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #ffffff;
`;

export const SolosList = styled.FlatList.attrs({
    marginHorizontal: 15
})`
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-Right-radius: 15px;
    margin-left: 5px;
    margin-right: 5px;
`;