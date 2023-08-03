import { styled } from 'styled-components';
import { ReactComponent as LogoBig } from '../assets/logoBig.svg';
import { ReactComponent as VerticalLine } from '../assets/verticalLine.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { getUserInfo, loginUser } from '../apis/api/user';
import { LoginData } from '../utils/interface';

const validationSchema = yup.object({
    email: yup.string().required('이메일을 입력해주세요!').email('@를 포함한 유효한 이메일 주소를 작성해주세요.'),
    password: yup
        .string()
        .required('비밀번호를 입력해주세요!')
        .min(6, '비밀번호는 6글자 이상이여야 합니다.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, '비밀번호는 영어 대소문자와 숫자를 포함해야 합니다.'),
});

export default function LogIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        try {
            // 로그인 API 호출
            const response = await loginUser(data.email, data.password);
            // console.log('주소있냐', userInfo);
            // 로그인 성공 시 처리
            alert('바리바리에 무사히 로그인하셨습니다:)');
            //만약에 위치 설정을 하지 않은 유저이면 위치 등록 페이지로 이동
            handleLoginNavigate();
        } catch (error) {
            // 로그인실패 처리
            alert('로그인 실패!');
        }
    };

    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate('/join');
    };

    const handleLoginNavigate = async () => {
        try {
            const userInfo = await getUserInfo();
            console.log(userInfo.data.position.latitude);
            if (userInfo) {
                if (userInfo.data.position.latitude === 0) {
                    navigate('/signup3');
                } else {
                    navigate('/home');
                }
            } else {
                alert('사용자 정보를 가져오는데 실패하였습니다.');
            }
        } catch (error) {
            alert('사용자 정보를 가져오는데 실패하였습니다.');
            console.log('Error:', error);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <Wrapper>
                <LogoBig />
                <SubTitle>자취생을 위한 건강한 식사 방법</SubTitle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputWrapper>
                        <Input
                            type="text"
                            placeholder="이메일을 입력해주세요."
                            aria-invalid={!!errors.email}
                            {...register('email')}
                            className={`form-control ${errors.email ? 'is-invalid' : ''} ${
                                !errors.email && getValues('email') ? 'is-valid' : ''
                            }`}
                        />
                        <ErrorMessage>{errors.email?.message}</ErrorMessage>
                        <Input
                            id="password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''} ${
                                !errors.password && getValues('password') ? 'is-valid' : ''
                            }`}
                        />
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    </InputWrapper>
                    <SubmitButton type="submit">로그인</SubmitButton>
                </Form>
                <OptionWrapper>
                    <span onClick={handleRegisterClick}>회원가입</span>
                    <VerticalLine />
                    <span>아이디 찾기</span>
                    <VerticalLine />
                    <span>비밀번호 찾기</span>
                </OptionWrapper>
                {/* sns 로그인은 mvp 단계에서 구현 보류 */}
                {/* <GoogleLoginWrapper>
                    <GoogleLoginText>
                        <HorizontalLine />
                        <p>SNS 계정으로 로그인</p>
                        <HorizontalLine />
                    </GoogleLoginText>

                    <GoogleLoginButton />
                </GoogleLoginWrapper> */}
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    padding: 0px 16px;
    margin-top: 141px;
`;
const SubTitle = styled.p`
    color: #504e5f;
    font-size: 20px;

    font-style: normal;
    font-weight: 600;
    line-height: 128.065%;
    margin-bottom: 40px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Input = styled.input`
    height: 28px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 0.75px solid #aaa;
    background: #fff;
    color: #504e5f;
    font-size: 16px;
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    outline: none;
    &::placeholder {
        color: #aaa;
    }
    &.is-invalid {
        border-color: red;
        transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    &.is-valid {
        border-color: blue;
        transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
`;

const SubmitButton = styled.button`
    display: flex;
    width: 100%;
    padding: 18px 40px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 18px;
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    border: none;
    margin-top: 24px;
`;

const OptionWrapper = styled.div`
    gap: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #504e5f;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 128.065%;
    margin-top: 18px;
    cursor: pointer;
`;

// const GoogleLoginWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 14px;
// `;
// const GoogleLoginText = styled.div`
//     margin-top: 66px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 21px;
//     color: var(--grey-3, #aaa);
//     font-size: 12px;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 128.065%;
// `;

// const GoogleLoginButton = styled.button`
//     display: flex;
//     padding: 8px 13px;
//     justify-content: center;
//     align-items: center;
//     gap: 4px;
//     border-radius: 12px;
//     background: var(--grey-1, #f9f9f9);
//     height: 40px;
// `;
