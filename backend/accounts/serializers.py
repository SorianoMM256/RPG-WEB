from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=4,
        error_messages={
            "min_length": "A senha deve ter pelo menos 4 caracteres."
        }
    )

    password_confirm = serializers.CharField(
        write_only=True,
        min_length=4
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "password_confirm",
        ]

    def validate_username(self, value):
        if not value.strip():
            raise serializers.ValidationError("O nome de usuário é obrigatório.")

        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")

        return value

    def validate_email(self, value):
        if not value.strip():
            raise serializers.ValidationError("O e-mail é obrigatório.")

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Este e-mail já está cadastrado.")

        return value

    def validate(self, data):
        if data["password"] != data["password_confirm"]:
            raise serializers.ValidationError({
                "password_confirm": "As senhas não conferem."
            })

        return data

    def create(self, validated_data):
        validated_data.pop("password_confirm")

        password = validated_data.pop("password")

        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
        )

        user.set_password(password)
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
        ]