package com.javaspring.proj.config;

import com.javaspring.proj.controller.BidController;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.Principal;
import java.util.*;

public class HttpSessionHandshakeInterceptor_personalised implements HandshakeInterceptor {


    /**
     * The name of the attribute under which the HTTP session id is exposed when
     * {@link #setCopyHttpSessionId(boolean) copyHttpSessionId} is "true".
     */
    private static final String HTTP_SESSION_ID_ATTR_NAME = "HTTP.SESSION.ID";


    private final Collection<String> attributeNames;

    private boolean copyAllAttributes;

    private boolean copyHttpSessionId = true;

    private boolean createSession;

    public  String userName;

    /**
     * Default constructor for copying all HTTP session attributes and the HTTP
     * session id.
     * @see #setCopyAllAttributes
     * @see #setCopyHttpSessionId
     */
    public HttpSessionHandshakeInterceptor_personalised() {
        this.attributeNames = Collections.emptyList();
        this.copyAllAttributes = true;
    }

    /**
     * Constructor for copying specific HTTP session attributes and the HTTP
     * session id.
     * @param attributeNames session attributes to copy
     * @see #setCopyAllAttributes
     * @see #setCopyHttpSessionId
     */
    public HttpSessionHandshakeInterceptor_personalised(Collection<String> attributeNames) {
        this.attributeNames = Collections.unmodifiableCollection(attributeNames);
        this.copyAllAttributes = false;
    }


    /**
     * Return the configured attribute names to copy (read-only).
     */
    private Collection<String> getAttributeNames() {
        return this.attributeNames;
    }

    /**
     * Whether to copy all attributes from the HTTP session. If set to "true",
     * any explicitly configured attribute names are ignored.
     * <p>By default this is set to either "true" or "false" depending on which
     * constructor was used (default or with attribute names respectively).
     * @param copyAllAttributes whether to copy all attributes
     */
    private void setCopyAllAttributes(boolean copyAllAttributes) {
        this.copyAllAttributes = copyAllAttributes;
    }

    /**
     * Whether to copy all HTTP session attributes.
     */
    private boolean isCopyAllAttributes() {
        return this.copyAllAttributes;
    }

    /**
     * Whether the HTTP session id should be copied to the handshake attributes
     * under the key {@link #HTTP_SESSION_ID_ATTR_NAME}.
     * <p>By default this is "true".
     * @param copyHttpSessionId whether to copy the HTTP session id.
     */
    private void setCopyHttpSessionId(boolean copyHttpSessionId) {
        this.copyHttpSessionId = copyHttpSessionId;
    }

    /**
     * Whether to copy the HTTP session id to the handshake attributes.
     */
    private boolean isCopyHttpSessionId() {
        return this.copyHttpSessionId;
    }

    /**
     * Whether to allow the HTTP session to be created while accessing it.
     * <p>By default set to {@code false}.
     * @see javax.servlet.http.HttpServletRequest#getSession(boolean)
     */
    public void setCreateSession(boolean createSession) {
        this.createSession = createSession;
    }

    /**
     * Whether the HTTP session is allowed to be created.
     */
    private boolean isCreateSession() {
        return this.createSession;
    }
    public static ArrayList<Principal> prr;
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {


        // Set ip attribute to WebSocket session
        attributes.put("ip", request.getRemoteAddress());

        // ============================================= PERSONAL CODE
        ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
        HttpServletRequest httpServletRequest = servletRequest.getServletRequest();
//        httpServletRequest.getCookies();
//        httpServletRequest.getParameter("inquiryId");
        userName = httpServletRequest.getRemoteUser();




        System.out.println("SessionHandshakeInterceptor::beforeHandshake()    httpServletRequest.getRemoteUser()(): " + userName);

        System.out.println("SessionHandshakeInterceptor::beforeHandshake()    request.getLocalAddress(): "+request.getLocalAddress());

        System.out.println("SessionHandshakeInterceptor::beforeHandshake()    request.getURI(): "+request.getURI());

        System.out.println("SessionHandshakeInterceptor::beforeHandshake()    request.getRemoteAddress(): "+request.getRemoteAddress());

        System.out.println("SessionHandshakeInterceptor::beforeHandshake()    request.getPrincipal(): "+request.getPrincipal());
        /*
         *   {
               Origin=[http://localhost:3000],
               Cookie=[__utma=111872281.293045146.1470257629.1470257649.1470362764.31;
               __utmc=111872281;
               __utmz=111872281.1470257629.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)],
               Sec-WebSocket-Key=[XGDdYK2TDz6djy852SzBNg==],
               User-Agent=[Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36],
               Connection=[Upgrade],
               Sec-WebSocket-Version=[13],
               Host=[localhost:8080],
               Accept-Encoding=[gzip, deflate, sdch],
               DNT=[1],
               Pragma=[no-cache],
               Upgrade=[websocket],
               Sec-WebSocket-Extensions=[permessage-deflate;
               client_max_window_bits],
               Cache-Control=[no-cache],
               Accept-Language=[en-US,en;q=0.8]
             }

         */
        System.out.println("SessionHandshakeInterceptor::beforeHandshake()    request.getHeaders(): "+request.getHeaders());

        attributes.forEach((key,value)-> System.out.println("SessionHandshakeInterceptor::beforeHandshake()   attributes Key: "+key+" Value: "+value));

        HttpSession session = getSession(request);
        if (session != null) {

            // ===================================== INI

            System.out.println("SessionHandshakeInterceptor::beforeHandshake()    session: "+session);


            // ===================================== END


            if (isCopyHttpSessionId()) {
                attributes.put(HTTP_SESSION_ID_ATTR_NAME, session.getId());
            }
            Enumeration<String> names = session.getAttributeNames();
            while (names.hasMoreElements()) {
                String name = names.nextElement();
                if (isCopyAllAttributes() || getAttributeNames().contains(name)) {
                    attributes.put(name, session.getAttribute(name));
                }
            }
        }

        return true;
    }

    private HttpSession getSession(ServerHttpRequest request) {
        if (request instanceof ServletServerHttpRequest) {
            ServletServerHttpRequest serverRequest = (ServletServerHttpRequest) request;
            return serverRequest.getServletRequest().getSession(isCreateSession());
        }
        return null;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception ex) {

//        BidController bc = new BidController();
        ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
        HttpServletRequest httpServletRequest = servletRequest.getServletRequest();
        prr = new ArrayList<>();
        prr.add(httpServletRequest.getUserPrincipal());
        System.out.println("Юзеров промежуточнй класс " + prr.size());
//        bc.getUserCount();

        System.out.println("SessionHandshakeInterceptor::afterHandshake()");

    }


}