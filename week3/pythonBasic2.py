# 복권 추첨기
# -*- coding: utf-8 -*- 
import random

def make_lotto():
    lotto = []
    # 1-45 사이의 번호 6개를 랜덤으로 뽑아 lotto 배열에 넣어보세요
    # HINT: random 모듈 사용
    for x in range(6):
        x=random.randint(1,45)
        while x in lotto:
            x=random.randint(1,45)
        lotto.append(x)
    return lotto

def print_lottos(lottos):
    # 뽑은 복권들을 형식에 맞게 출력해보세요
    # HINT: 정렬 함수 사용
    a=1
    for lotto in lottos:
        print('%d번째 복권: ' % a, sorted(lotto))
        a+=1
        




while True:
    # 구매할 복권의 개수를 입력받아보세요
    number=input('구매할 복권의 개수를 입력하세요: ')

    # 입력값이 숫자가 아닌 경우는 어떻게 처리할 수 있을까요?
    # HINT: 숫자 판별 함수 사용
    if (number.isdigit()==False):
        print('숫자를 입력하세요~!')
    else: 
    # 구매할 복권의 개수만큼 복권을 만들어 lottos 배열에 넣어보세요
        lottos = []
        a=1
        for x in range(int(number)):
            lottos.append(make_lotto())
            a+=1
        print_lottos(lottos)
        break
