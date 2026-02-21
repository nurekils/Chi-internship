from abc import ABC, abstractmethod

from aiohttp import payload_type


#the first principle of SOLID is violated
class Order:
    def calculate_total(self):
        pass

    def save_to_database(self):
        pass

    def send_email(self):
        pass

#Refactored
class Order2:
    def __init__(self):
        pass
class OrderCalculates():
    def calculate_total(self, order: Order2):
        pass
class OrderRepository():
    def save_to_database(self, order: Order2):
        pass
class EmailService():
    def send_email(self, order: Order2):
        pass

#second principle of SOLID is violated
class PaymentProcessor:
    def pay(self, payment_type):
        if payment_type == "card":
            print("Paying by card")
        elif payment_type == "paypal":
            print("Paying by PayPal")

#Refactored
class PaymentMethod(ABC):
    @abstractmethod
    def pay(self):
        raise NotImplementedError


class CardPayment(PaymentMethod):
    def pay(self):
        print("Paying by card")


class PayPalPayment(PaymentMethod):
    def pay(self):
        print("Paying by PayPal")


class Payment:
    def __init__(self, method: PaymentMethod):
        self.method = method

    def pay(self):
        self.method.pay()

#third principle of SOLID is violated
class Bird:
    def fly(self):
        print("Flying")

class Penguin(Bird):
    pass

# refactored

class FlyingBird(ABC):
    @abstractmethod
    def fly(self):
        pass

class SwimmingBird(ABC):
    @abstractmethod
    def swim(self):
        pass

class Eagle(FlyingBird):
    def fly(self):
        print("Flying")

class Penguin2(SwimmingBird):
    def swim(self):
        print("Swimming")


