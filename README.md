# spring声明式事务测试项目

项目分为三大部分:

基础事务测试(BasicsTransactionTestController)

事务的传播行为测试(SpreadTransactionTestController)

事务的其他特性(OtherTransactionTestController)

swagger地址:http://localhost:8003/swagger-ui.html

数据库地址:192.168.32.51  tset_transaction   root/mesadt

文档地址: p6paly\src\main\resources\static\spring事务管理.docx

测试数据sql: p6paly\src\main\resources\test.sql
## 基础事务测试说明

noTransaction() 测试没有事务正常运行情况

noTransactionInterrupt() 测试没有事务被异常中断情况

simple() 测试有事务被异常中断情况

testTryCatch()  测试有事务trycatch不抛异常时情况

## 事务的传播行为测试说明

required()  没有事务的方法调用同一个类里传播行为required的方法

noSupported() 传播行为noSupported方法调用同一个类里传播行为required的方法

noSupportedNoClass  传播行为noSupported方法调用不同类里传播行为required的方法

这三个方法验证 当一个方法被同一个类中的其他方法调用时，spring无法将这个方法加到事务管理中。

![snipaste_20210511_100853](https://user-images.githubusercontent.com/51697404/117747545-f4d23500-b240-11eb-9b24-bd00e349c44c.png)

SupportedYes() 有事务的方法调用传播行为为Support的方法

Supported() 没有事务的方法调用传播行为为Support的方法

requesnew1() 外层事务回滚内层事务传播行为为REQUIRES_NEW

requesnew2() 外层事务正常内层事务传播行为为REQUIRES_NEW回滚

nested1() 外层事务回滚内层事务传播行为为NESTED

nested2() 外层事务正常内层事务传播行为为NESTED回滚

never() 传播行为PROPAGATION_NEVER测试

mandatory() 传播行为 PROPAGATION_MANDATORY测试

## 事务的其他特性

readOnly() 事务设置只读

timeoutTest() 事务设置超时

rollbackForTest() 指定遇到时必须进行回滚的异常类型

NorollbackForTest() 指定遇到时不需要进行回滚的异常类型

### 欢迎大家在此基础上进行其他测试与补充


