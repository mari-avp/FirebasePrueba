package com.marianvelez.GruasUCAB

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    companion object {
        private const val TAG = "MyFirebaseMessagingService"
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        // Manejar el mensaje recibido
        Log.d(TAG, "From: ${remoteMessage.from}")

        // Si el mensaje contiene datos, procesarlos
        remoteMessage.data.isNotEmpty().let {
            Log.d(TAG, "Message data payload: ${remoteMessage.data}")
        }

        // Si el mensaje contiene una notificación, mostrarla
        remoteMessage.notification?.let {
            Log.d(TAG, "Message Notification Body: ${it.body}")
        }
    }

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d(TAG, "New token: $token")

        // Aquí puedes enviar el token al servidor si es necesario
    }
}
