# -*- coding: utf-8 -*- 
# 문자열 다루기

string_input = "  abcd ,    abcd  "

# 문자열을 콤마를 기준으로 나누어 각각 저장해보세요
A,B=string_input.split(',')

# 두 개의 문자열이 가진 앞뒤 공백을 제거해볼까요?
A = A.strip()
B = B.strip()

# 두 개의 문자열이 같은지 비교하여 결과를 출력해보세요
if A==B:
    print("%s, %s는 같은 문자열입니다." %(A, B))
else:
    print("%s, %s는 다른 문자열입니다." %(A, B))

# 다시 두 개의 문자열을 합쳐 하나의 문자열로 만드세요
C=A+B

# 합친 문자열의 길이를 출력해보세요
print("%s의 길이는 %d입니다." %(C, len(C)))
