pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'cd backend && ./mvnw clean package -DskipTests'
                    } else {
                        bat 'cd backend && mvnw.cmd clean package -DskipTests'
                    }
                }
            }
        }

        stage('Build Images') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose build'
                    } else {
                        bat 'docker-compose build'
                    }
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose down'
                        sh 'docker-compose up -d'
                    } else {
                        bat 'docker-compose down'
                        bat 'docker-compose up -d'
                    }
                }
            }
        }
    }
}
