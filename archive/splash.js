var s = 2;
            var x = setInterval(function(){
                document.getElementById("clock").innerHTML = s;
                if (s < 1){
                    window.close();
                }
                s = s-1;
            },1000);