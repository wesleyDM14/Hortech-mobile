import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #ffffff;
`;

export const Container = styled.KeyboardAvoidingView`
    align-items: center;
    justify-content: center;
`;

export const Nome = styled.Text`
    font-size: 19px;
    color: #000;
    font-style: italic;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #00b94a;
    width: 90%;
    height: 45px;
    border-radius: 7px;
    margin-bottom: 7px;
`;

export const SubmitText = styled.Text`
    font-size: 17px;
    color: #131313;
`;